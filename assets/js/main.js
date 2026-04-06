/* =========================================================
   추가 시트 연동 섹션 (JS에서 분리된 스타일)
   ========================================================= */
.schedule-month-accent { color: #2f6df6; font-weight: 800; }
.schedule-badge-month { font-weight: 800; }
.sheet-extra-section { padding: 40px 0 10px; }
.sheet-extra-wrap { width: min(1200px, calc(100% - 40px)); margin: 0 auto; }
.sheet-extra-head { margin: 0 0 18px; }
.sheet-extra-label { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; background: #eef4ff; color: #2f6df6; font-weight: 800; font-size: 12px; letter-spacing: .02em; }
.sheet-extra-title { margin: 14px 0 0; font-size: 34px; line-height: 1.2; color: #0e1b39; }
.sheet-extra-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.sheet-extra-grid-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.sheet-extra-basic-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
.sheet-extra-card { background: #fff; border: 1px solid #e8edf6; border-radius: 28px; padding: 24px; box-shadow: 0 10px 30px rgba(17, 34, 68, .05); }
.sheet-extra-card-basic { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(240px, .8fr); gap: 24px; align-items: center; }
.sheet-extra-card h3 { margin: 0 0 10px; font-size: 24px; line-height: 1.35; color: #0e1b39; }
.sheet-extra-card p { margin: 0; color: #5a6a85; line-height: 1.7; }
.sheet-extra-muted { margin-bottom: 10px !important; }
.sheet-extra-media { overflow: hidden; border-radius: 22px; background: #f4f7fb; }
.sheet-extra-media img { display: block; width: 100%; height: auto; }
.sheet-extra-points { margin: 14px 0 0; padding-left: 18px; color: #2d3d58; line-height: 1.7; }
.sheet-extra-points li+li { margin-top: 6px; }
.sheet-extra-action { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
.sheet-extra-chip { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 999px; background: #f1f5ff; color: #2f6df6; font-weight: 800; font-size: 12px; margin-bottom: 10px; }
.sheet-extra-inline-tag { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 999px; background: #f6f7fb; color: #55637e; font-weight: 700; font-size: 12px; }
.sheet-extra-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.sheet-extra-tags span { display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 999px; background: #f6f7fb; color: #55637e; font-weight: 700; font-size: 12px; }
.sheet-extra-step-no { display: inline-flex; margin-bottom: 10px; font-size: 12px; font-weight: 800; color: #2f6df6; }
.sheet-extra-highlight { margin-top: 12px; color: #2f6df6; font-weight: 800; }
.sheet-extra-faq-list { display: grid; gap: 14px; }
.sheet-extra-faq { background: #fff; border: 1px solid #e8edf6; border-radius: 24px; overflow: hidden; }
.sheet-extra-faq summary { cursor: pointer; list-style: none; padding: 20px 22px; font-size: 18px; font-weight: 800; color: #0e1b39; }
.sheet-extra-faq summary::-webkit-details-marker { display: none; }
.sheet-extra-faq-body { padding: 0 22px 20px; }
.sheet-debug-panel { width: min(1200px, calc(100% - 40px)); margin: 28px auto 40px; background: #0f172a; color: #d7e3ff; border-radius: 20px; padding: 18px 20px; box-sizing: border-box; }
.sheet-debug-title { font-size: 14px; font-weight: 800; margin: 0 0 10px; color: #fff; }
.sheet-debug-list { display: grid; gap: 8px; max-height: 280px; overflow: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; line-height: 1.5; }
.sheet-debug-item { padding: 8px 10px; border-radius: 12px; background: rgba(255, 255, 255, .06); word-break: break-word; }

@media (max-width: 960px) {
  .sheet-extra-grid, .sheet-extra-grid-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sheet-extra-card-basic { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .sheet-extra-wrap, .sheet-debug-panel { width: min(100%, calc(100% - 24px)); }
  .sheet-extra-title { font-size: 28px; }
  .sheet-extra-grid, .sheet-extra-grid-steps { grid-template-columns: 1fr; }
  .sheet-extra-card { padding: 20px; }
}
