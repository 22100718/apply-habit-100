# Habit Tracker · 입사지원 100일

STEP 4 implementation of selected Product Design option 1. Responsive React/Vite web app with browser-local persistence. No sign-up, backend database, external job-feed API, GitHub publishing, or Vercel deployment.

- First visit starts Day 1; 100 local calendar dates, year/leap-day-safe arithmetic.
- A submitted application completes that date. One essay answer marks minimum progress. Multiple submissions on one date count once.
- Employers, job deadlines, results, notes, preparation checklists, scheduled/pinned daily tasks, history and guarded record reset.
- localStorage key: apply-habit-100-v1. Data is private to the browser and origin. Private Sites preview has a separate origin from local QA.
- Job announcements are manually registered. Automatic Jasoseol integration is not implemented.

Run: npm ci, npm run dev. Checks: node --test tests/habit-model.test.mjs; npm run check:runtime; npm run build; npm run test:sites.

Source modules: src/model.ts (date/record calculations), src/Prototype.tsx (UI), src/prototype.css (selected design). design-qa.md records browser evidence and intentional responsive adaptations. Device runtime shell is intentionally unmounted under the user's explicit no-device-frame requirement; unused starter mobile components remain retained.

Sites project identity is in .openai/hosting.json. Continue this project for STEP 5. GitHub and Vercel final publication are deferred to STEP 6.
