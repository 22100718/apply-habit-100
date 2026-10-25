export type DayState = 'complete' | 'minimum' | 'none';
export const STATUSES = ['지원 전', '지원 완료', '서류 합격', '면접 진행', '최종 합격', '불합격'] as const;
export type CompanyStatus = typeof STATUSES[number];
export type Task = { id: string; title: string; kind: 'essay' | 'other'; date: string; todayDates: string[]; doneDates: string[] };
export type Company = { id: string; name: string; role: string; link: string; deadline: string; interest: string; status: CompanyStatus; note: string; submissions: string[]; essayDates: string[]; tasks: Task[] };
export type Store = { version: 1; start: string; companies: Company[] };
export const STORAGE_KEY = 'apply-habit-100-v1';
export const LENGTH = 100;
export function localDate(date = new Date()): string { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function parseDate(s: string): Date { const [y,m,d] = s.split('-').map(Number); return new Date(Date.UTC(y,m-1,d)); }
export function validDate(s: unknown): s is string { return typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(parseDate(s).getTime()) && parseDate(s).toISOString().slice(0,10)===s; }
export function addDays(s: string, days: number): string { const d=parseDate(s); d.setUTCDate(d.getUTCDate()+days); return d.toISOString().slice(0,10); }
export function dayNumber(start: string, date: string): number { return Math.round((parseDate(date).getTime()-parseDate(start).getTime())/86400000)+1; }
export function canRecord(start: string, date: string, today: string): boolean { return validDate(date) && date>=start && date<=addDays(start,99) && date<=today; }
export function challengeDates(start: string): string[] { return Array.from({length:LENGTH},(_,i)=>addDays(start,i)); }
export function emptyStore(today=localDate()): Store { return {version:1,start:today,companies:[]}; }
export function stateAt(store: Store, date: string): DayState { if(store.companies.some(c=>c.submissions.includes(date))) return 'complete'; if(store.companies.some(c=>c.essayDates.includes(date))) return 'minimum'; return 'none'; }
export function stats(store: Store, today: string) { const dates=challengeDates(store.start).filter(d=>d<=today); const completed=dates.filter(d=>stateAt(store,d)==='complete').length; let cursor=today>addDays(store.start,99)?addDays(store.start,99):today; if(stateAt(store,cursor)!=='complete')cursor=addDays(cursor,-1); let streak=0; while(cursor>=store.start && stateAt(store,cursor)==='complete'){streak++;cursor=addDays(cursor,-1);} return {completed,percent:completed,streak}; }
export function newId(): string { const bytes=new Uint8Array(16); crypto.getRandomValues(bytes); return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join(''); }
export function makeCompany(today: string): Company { return {id:newId(),name:'',role:'',link:'',deadline:'',interest:'미정',status:'지원 전',note:'',submissions:[],essayDates:[],tasks:[{id:newId(),title:'자기소개서 한 문항 작성',kind:'essay',date:today,todayDates:[],doneDates:[]}]}; }
export function uniqueAdd(values: string[], date: string): string[] { return Array.from(new Set([...values,date])); }
export function clearDay(store: Store, date: string): Store { return {...store,companies:store.companies.map(c=>{const submissions=c.submissions.filter(d=>d!==date);return {...c,submissions,essayDates:c.essayDates.filter(d=>d!==date),status:submissions.length===0&&c.status==='지원 완료'?'지원 전':c.status,tasks:c.tasks.map(t=>({...t,doneDates:t.doneDates.filter(d=>d!==date)}))};})}; }
export function recordDay(store: Store, date: string, today: string, state: DayState, companyId: string): Store {
  if(!canRecord(store.start,date,today))throw new Error('챌린지 기간 안의 오늘 또는 지난 날짜만 기록할 수 있습니다.');
  if(state!=='none'&&!store.companies.some(c=>c.id===companyId))throw new Error('기록할 기업을 선택해주세요.');
  if(state==='none')return clearDay(store,date);
  let next=store;
  if(state==='minimum')next={...store,companies:store.companies.map(c=>{const submissions=c.submissions.filter(d=>d!==date); return {...c,submissions,status:submissions.length===0&&c.status==='지원 완료'?'지원 전':c.status};})};
  return {...next,companies:next.companies.map(c=>c.id!==companyId?c:state==='complete'?{...c,submissions:uniqueAdd(c.submissions,date),status:c.status==='지원 전'?'지원 완료':c.status}:{...c,essayDates:uniqueAdd(c.essayDates,date)})};
}
export function toggleTask(store: Store, companyId: string, taskId: string, date: string, today: string): Store {
  if(!canRecord(store.start,date,today))throw new Error('이 날짜에는 수행 기록을 남길 수 없습니다.');
  return {...store,companies:store.companies.map(c=>{if(c.id!==companyId)return c;const task=c.tasks.find(t=>t.id===taskId);if(!task)return c;if(task.kind==='essay')return {...c,essayDates:c.essayDates.includes(date)?c.essayDates.filter(d=>d!==date):uniqueAdd(c.essayDates,date)};return {...c,tasks:c.tasks.map(t=>t.id!==taskId?t:{...t,doneDates:t.doneDates.includes(date)?t.doneDates.filter(d=>d!==date):uniqueAdd(t.doneDates,date)})};})};
}
export function loadStore(raw: string|null, today: string): Store {
  if(!raw)return emptyStore(today);const s=JSON.parse(raw);
  const stringArray=(v:unknown)=>Array.isArray(v)&&v.every(x=>typeof x==='string');
  if(s.version!==1||!validDate(s.start)||!Array.isArray(s.companies)||!s.companies.every((c:Company)=>typeof c.id==='string'&&typeof c.name==='string'&&typeof c.role==='string'&&typeof c.link==='string'&&typeof c.deadline==='string'&&typeof c.note==='string'&&typeof c.interest==='string'&&STATUSES.includes(c.status)&&stringArray(c.submissions)&&c.submissions.every(validDate)&&stringArray(c.essayDates)&&c.essayDates.every(validDate)&&Array.isArray(c.tasks)&&c.tasks.every(t=>typeof t.id==='string'&&typeof t.title==='string'&&['essay','other'].includes(t.kind)&&typeof t.date==='string'&&stringArray(t.todayDates)&&stringArray(t.doneDates))))throw new Error('저장된 데이터를 읽지 못했습니다. 기존 데이터는 덮어쓰지 않았습니다.');
  return s as Store;
}
