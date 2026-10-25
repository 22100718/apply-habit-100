# Habit Tracker · 입사지원 100일

Final implementation of selected Product Design option 1. Responsive React/Vite web app with browser-local persistence. No sign-up, backend database, or external job-feed API.

- First visit starts Day 1; 100 local calendar dates, year/leap-day-safe arithmetic.
- A submitted application completes that date. One essay answer marks minimum progress. Multiple submissions on one date count once.
- Employers, job deadlines, results, notes, preparation checklists, scheduled/pinned daily tasks, history and guarded record reset.
- localStorage key: apply-habit-100-v1. Data is private to the browser and origin. Private Sites preview has a separate origin from local QA.
- Job announcements are manually registered. Automatic Jasoseol integration is not implemented.

Run: npm ci, npm run dev. Checks: node --test tests/habit-model.test.mjs; npm run check:runtime; npm run build; npm run test:sites.

Source modules: src/model.ts (date/record calculations), src/Prototype.tsx (UI), src/prototype.css (selected design). design-qa.md records browser evidence and intentional responsive adaptations. Device runtime shell is intentionally unmounted under the user's explicit no-device-frame requirement; unused starter mobile components remain retained.

## Public deployment

- App: https://apply-habit-100.vercel.app/
- Repository: https://github.com/22100718/apply-habit-100
- Production branch: main, linked through the Vercel GitHub integration.
- Framework: Vite; Root Directory: repository root; Install Command: npm ci; Build Command: npm run build; Output Directory: dist/client.
- vercel.json declares the static output and SPA routing. The Sites Worker output remains for the separate private preview; Vercel serves dist/client directly.
- No API keys or environment variables are required.
- Public HTML, JavaScript and CSS return HTTP 200 without cookies or authentication headers. Browser checks cover minimum/completed/incomplete state changes, persistence after reload, progress, streak and mobile layout.
- Browser-local data is scoped to its origin. Records from the private Sites preview do not transfer automatically to the Vercel URL. New visitors start with no example employers or fabricated records.

Sites project identity remains in .openai/hosting.json for the separate private preview.
