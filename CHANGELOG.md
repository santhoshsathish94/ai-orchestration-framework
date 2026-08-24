# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- `QUICKSTART.md` — apply the lifecycle to your first task in about 15 minutes.
- `templates/orchestration-brief.md` — a reusable one-page brief covering all six stages, with copy-and-paste prompts and explicit human/AI ownership.
- `examples/production-exception-remediation/` — an end-to-end walkthrough applying the lifecycle (and the orchestration brief) to a recurring production 5xx exception, now labeled as an illustrative scenario.
- Case study 03 — "Contextual Reasoning in a Newborn Care Scenario," illustrating how orchestration can identify a missing signal, support evidence gathering, and keep the consequential decision with the appropriate human expert.
- `docs/how-ai-fails.md` — eight AI-specific failure modes and the lifecycle stage that catches each one.
- `docs/glossary.md` — plain-language definitions for every term the framework uses.
- **Evidence ladder** in the Proof stage — five rungs from "asserted" to "observed in the real environment," with the rule to name the rung you actually reached.
- **Autonomy ladder** in the AI Orchestration Model — five levels of goal-directed autonomy, each earned through consistently achieved Proof, capped by blast radius and revocable.
- "When Proof fails" guidance — a failed proof returns to Understand, not to Execute.
- "What it is not" scope boundaries in the README.
- `case-studies/README.md` — an index that distinguishes outcome case studies from reasoning patterns.
- GitHub issue and pull request templates that follow Opportunity → Change → Proof.
- `site/` — an interactive website deployed to GitHub Pages: the lifecycle explorer (including the Proof → Understand failure edge), the evolution from models to orchestration, the evidence ladder, the AI failure-mode matcher, the autonomy ladder, and a searchable glossary. No build step and no dependencies; readable with JavaScript disabled.

### Changed
- Expanded the framework philosophy beyond engineering workflows to describe AI as reducing barriers to entering new fields of expertise while helping identify gaps, surface missing information, and prove outcomes.
- Added the guiding statement: **AI expands what humans can understand, reduces what humans can miss, and helps prove what humans accomplish.**
- Reduced the principles from eleven to **six — one per lifecycle stage**, folding context, gap-identification, execution ownership, and collective capability into the stage they belong to.
- Converted the philosophy's numbered list into prose beliefs so the principles are the only numbered list.
- Collapsed five competing loop formulations onto the single canonical lifecycle across the philosophy, case study 03, and the AI Future hypothesis.
- Reframed the AI Future hypothesis to acknowledge prior art on competitive AI-safety dynamics and to connect back to the framework as the discipline for granting autonomy; demoted it in the README.
- Rewrote the README navigation to surface the Quickstart, template, and worked example, and corrected the release status.
- Renamed `docs/07-validation.md` to `docs/07-proof.md` to match the stage name.

### Removed
- `docs/AI-FUTURE.md` — an orphaned pointer file describing a superseded version of the hypothesis.
- Eight unused AI Future illustrations, the unused `assets/ai-orchestration-model.png`, and the empty `diagrams/` placeholder.
- Career- and resume-positioning references from the philosophy.

## v0.3.0 — 2026-08-14

### Added
- `docs/reference-implementations.md` — Cross-Team Knowledge Access and Production Exception Remediation, shown as applications of the core lifecycle.
- Diagrams for the lifecycle and both reference implementations.
- "The real bottleneck" opening in `docs/01-problem.md` — turning distributed capability (human and AI) into outcomes.
- `CONTRIBUTING.md` — how to raise an issue or pull request, what we look for, and an open, feedback-driven stance.

### Changed
- Reframed the core model as **Opportunity → Understand → Plan → Execute → Proof → Grow**, and widened the framing from orchestrating AI agents to orchestrating capability (human and AI).
- Rewrote the principles and aligned the philosophy, docs 01–10, field-practices, and case study 02 to the new model.
- Tagline changed to "Transform Opportunity into Outcomes."

## v0.2.0 — 2026-08-14

### Added
- Case study 02 — "Fixing a React Server Components Memory Leak Upstream," a real-world contribution to upstream React, with a visual of the progression: production OOM → workaround → continued investigation → root cause → validated fix → upstream contribution.
- `docs/field-practices.md` — field lessons (focus over parallelism; understand before fixing; a workaround is not the destination).

### Changed
- Reworked the case-study voice across case studies 01 and 02 to emphasize that AI lowers the barrier to meaningful work (removed "built entirely by AI" / single-engineer framing).
- Renamed the case-studies milestone to "Real-World Engineering Case Studies" and refreshed the README status/navigation.

### Fixed
- Resolved duplicate `05` documentation numbering (Practices moved out of the numbered sequence to `docs/field-practices.md`).

## v0.1.0

- Repository created and initial project structure established.
- Initial documentation scaffold and folder structure.
- Added `docs/`, `case-studies/`, `diagrams/`, `templates/`, and `examples/` README files.
