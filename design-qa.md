# Design QA — selected option 1

final result: passed

## Visual source and evidence
- Source: /workspace/scratch/75ba559b6465/generated_images/exec-cc1e8e77-218b-4d8c-a4d7-b0ddfc8fb903.png
- Original source: 853 × 1844 px; normalized to 390 × 844 px.
- Browser evidence: /workspace/scratch/habit-mobile-verified.jpg (1363 × 936 browser capture; app crop 390 × 844 CSS px, 1x density), /workspace/scratch/habit-mobile-bottom.jpg, /workspace/scratch/habit-desktop-verified.jpg.
- Combined, equal-width full view comparison: qa/mobile-comparison.jpg. It includes source, implementation top, and implementation scrolled bottom in one input; opened and inspected together.
- Focused controls comparison: qa/controls-comparison.jpg; opened and inspected together.
- State: 2026-10-25, Day 1, 0% completed, 0-day streak, incomplete. Source uses three fictional employers, implementation uses one explicitly named QA employer. Row count/content differences are data-driven, not missing components.
- Responsive checks: actual browser iframe viewports at 320, 390 and 430px; app clientWidth equals scrollWidth at each size. Desktop app width 1080px; no horizontal overflow.
- User explicitly requested responsive, unframed web content. No phone/device/OS mockup is mounted. This overrides the template's device runtime. Main record controls measure 44px high at 320px width.

## Findings and iteration history
- Initial [P2] mobile calendar cells were too tall relative to source. Reduced mobile cells from 56px to 36px; reduced section gaps, title spacing and row padding. Post-fix evidence: qa/mobile-comparison.jpg. Source layout order and main visual proportions retained. Native 44px record controls, additional entry controls and variable-length employer content mean the working app may scroll further than the generated flat mock. This is an intentional usability adaptation, not a one-screen-height constraint.
- Initial functional issue: crypto.randomUUID unavailable on HTTP local preview. Replaced with getRandomValues-based IDs and reran model/browser tests.
- Initial functional issue: native date input fill was not reflected by React onChange in this browser. Added onInput handlers; verified deadline 2026-10-28 appears on the calendar and future/pre-start/post-end dates disable record saving.
- No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces
- Typography: clean Korean system sans-serif; same bold app heading/goal and smaller muted labels. Primary text does not overflow at 320px; record controls retain readable sizes. The generated mock does not name an exact font, so system Korean fallback is used. Slight weight differences are P3.
- Spacing/layout: same header/date, pale goal panel, primary/secondary record buttons, three state indicators, streak and horizontal progress bar, employer rows, monthly recruiting calendar, tasks and history link. Desktop uses the previously requested right-side task list. No ring/agenda/bottom-dock concepts from options 2/3 are used.
- Colors/tokens: navy #0b1d3e, cobalt #0664ff, pale #f5f8fc, green/amber/red states. Status labels and icons accompany color. Thin divider and light calendar grid match selected direction.
- Image quality/assets: source contains no raster illustration/photo assets. Radix icons provide chevrons/status symbols/settings; no fabricated image/phone assets. Remaining unused starter device assets are not rendered.
- Copy/content: fixed goal and action labels match. Fake employer records are absent from initial production state. Controls for actual data entry replace the source's example-data badge with auto-save/settings. No motivational copy, ads, emotional copy or illustration.

## Browser interactions verified
- Initial app opens, reads local date and persists first-use start date.
- Add employer, role, link, deadline, decision, checklist item and note.
- Essay checkbox records minimum without increasing completed-day percentage; state survives reload.
- Submission records completion; after reload percentage=1 and streak=1; repeated submission does not add duplicate day (also tested in model).
- Change employer result to document-screen pass; prior submission stays completed.
- History reads actual stored state; today opens editor; future and before-start dates disabled.
- Future, before-start and after-end date inputs disable save; model guards also throw on writes.
- Complete → minimum → incomplete updates stored state, percentage and streak correctly.
- Mobile minimum button opens editor and saves; history and return-to-list work.
- Reset opens a confirmation surface; cancel leaves data in place. Destructive confirmation was not exercised on the live browser's test storage.
- Current QA tab application console: no warnings/errors; unrelated browser-extension metadata errors excluded. Earlier application errors were fixed and retested.

## Follow-up polish
- P3: Radix outline status icons differ slightly from the filled icons in the generated mock. No effect on status recognition.
- Real iOS/Android physical-device behavior is not independently tested; responsive browser viewport checks passed.

## Implementation checklist
- [x] Preserve selected option 1, no option 2/3 blending.
- [x] Check the primary record and data-entry paths in browser.
- [x] Compare source and rendered UI at normalized density.
- [x] Date boundaries, duplicate handling, streak and persistence model checks.
- [x] No horizontal clipping at mobile widths, native page scroll and accessible dialog focus handling.
