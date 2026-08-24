# Changelog

All notable changes to this project will be documented in this file.

## v0.4.0 — 2026-08-24

A review pass over the whole framework, plus the first website. The model itself did not change; what
changed is how much of it is usable, and how honestly it states what it knows.

### Added — making the model usable
- `QUICKSTART.md` — apply the lifecycle to your first task in about 15 minutes.
- `templates/orchestration-brief.md` — a reusable one-page brief covering all six stages, with copy-and-paste prompts and explicit human/AI ownership.
- `examples/production-exception-remediation/` — an end-to-end walkthrough applying the lifecycle (and the orchestration brief) to a recurring production 5xx exception, labeled as an illustrative scenario.
- `site/` — an interactive website deployed to GitHub Pages: the lifecycle explorer (including the Proof → Understand failure edge), the evolution from models to orchestration, the evidence ladder, the AI failure-mode matcher, the autonomy ladder, and a searchable glossary. No build step and no dependencies; readable with JavaScript disabled.

### Added — new instruments
- **Evidence ladder** in the Proof stage — five rungs from "asserted" to "observed in the real environment," with the rule to name the rung you actually reached. Wired into the Quickstart, the brief template, and the worked example.
- **Autonomy ladder** in the AI Orchestration Model — five levels of goal-directed autonomy, each earned through consistently achieved Proof, capped by blast radius and revocable. Applied in `docs/08-governance.md`.
- "When Proof fails" guidance — a failed proof returns to Understand, not to Execute.
- `docs/how-ai-fails.md` — eight AI-specific failure modes and the lifecycle stage that catches each one.
- `docs/glossary.md` — plain-language definitions for every term the framework uses.

### Added — scope and evidence
- Case study 03 — "Contextual Reasoning in a Newborn Care Scenario," illustrating how orchestration can identify a missing signal, support evidence gathering, and keep the consequential decision with the appropriate human expert.
- `case-studies/README.md` — an index that distinguishes outcome case studies from reasoning patterns.
- "What it is not" scope boundaries in the README.
- GitHub issue and pull request templates that follow Opportunity → Change → Proof.

### Changed
- Reduced the principles from eleven to **six — one per lifecycle stage**, folding context, gap-identification, execution ownership, and collective capability into the stage they belong to.
- Collapsed five competing loop formulations onto the single canonical lifecycle across the philosophy, case study 03, and the AI Future hypothesis.
- Expanded the framework philosophy beyond engineering workflows, adding the guiding statement: **AI expands what humans can understand, reduces what humans can miss, and helps prove what humans accomplish.**
- Converted the philosophy's numbered list into prose beliefs so the principles are the only numbered list.
- Reframed the AI Future hypothesis to acknowledge prior art on competitive AI-safety dynamics and to connect back to the framework; demoted it in the README.
- Sharpened the AI Future hypothesis: added the unsolved technical barriers to autonomy (continual learning, long-horizon credit assignment, compounding reliability, physical sample efficiency, open-ended goal evaluation), the asymmetry of restraint as a unilateral cost, the follower's shortcut (compete on leash length rather than model quality), the physical axis as a non-substitutable resource, and a "what would make this wrong" falsifiability section. The argument names no actor by design.
- Rewrote the README navigation to surface the Quickstart, template, and worked example, and corrected the release status.
- Renamed `docs/07-validation.md` to `docs/07-proof.md` to match the stage name.

### Removed
- `docs/AI-FUTURE.md` — an orphaned pointer file describing a superseded version of the hypothesis.
- Eight unused AI Future illustrations, the unused `assets/ai-orchestration-model.png`, and the empty `diagrams/` placeholder.
- Career- and resume-positioning references from the philosophy.

### Fixed
- Redrew the three AI Future illustrations, which still carried headlines from the pre-rewrite "collective intelligence" version of that hypothesis and contradicted the text beside them.

### Known gaps
- `docs/05`, `06`, `08`, `09` and `10` remain short next to `docs/04`; governance and adoption are the ones most worth depth.
- The framework's own evidence base is three case studies from one practitioner. Outside case studies are welcome.

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
