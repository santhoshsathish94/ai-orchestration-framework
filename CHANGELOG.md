# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- `AGENTS.md` — the entire operating model written as **instructions for an AI agent**, in one self-contained file. Covers the six stages, the session-start context read, evidence gathering, a self-check against known failure modes, the evidence ladder with the instruction to name the rung reached, the limits of an agent's authority, and what to write back before finishing. A human needs the full framework; an agent can be pointed at this one file.
- `site/llms.txt` — the site made legible to models: a short description and curated links to the raw markdown, grouped by core, practice, and evidence, telling an agent to read `AGENTS.md` first.
- **"Spend capability where it counts"** in `docs/orchestration-environment.md` — a strong model holds the plan and owns the outcome while cheaper models do scoped work beneath it, supervised rather than trusted. Includes the two cautions: do not under-resource the thinking to save money, and do not confuse fanning out with progress.
- **"Where context lives"** in `docs/05-context-engineering.md` — the mechanism behind reusable context: plain markdown committed beside the code, updated continuously, answering what the goal is, what is established, what remains, and what was learned. Grow made concrete.
- **Field Lesson 4 — you do not have to hold the context to be accountable for it.** Being out of date on an area is an access problem, not a competence problem. The domain was already in the repository and the running application; what changed was that it became reachable.
- **Field Lesson 5 — write the understanding down, or pay for it again.** Two efforts in the same period: one kept persistent context files and converged; the other did not, and degenerated into repeated attempts until the loop was applied deliberately.
- **A three-step Start section** in the README and on the website: copy `AGENTS.md` into your project, give the agent read-only access to the evidence, run one real problem through the loop.
- **"Three things that matter most"** on the website — people are still the point, set it up with your own agent, and spend capability where it counts.
- `docs/orchestration-environment.md` — **the access layer** that makes orchestration possible: what it connects to (repositories, work tracking, pipelines, logs, datastores, non-production environments, the running application), how context forms a chain with a threshold, how it accumulates across passes without becoming thrashing, a practical build sequence ordered by increasing risk, the rules for granting access, and what it deliberately does not require.
- A third reference implementation, **Multi-Repository Defect Remediation** — working a batch of defects across service boundaries rather than one at a time, ending in verified closure for those genuinely fixed and better context for those not.
- A **"Watching the watcher"** section in `docs/orchestration-environment.md` and a matching gap statement in `docs/08-governance.md`: there is currently no monitoring layer that detects an agent doing something unintended inside access it was legitimately granted. Stated as an open problem rather than worked around.
- Guidance in `docs/08-governance.md` on **attributing every action to a person** — running work under the credentials of the accountable human, for traceability and for the restraint that comes with it.
- A concrete adoption sequence in `docs/09-adoption.md`, replacing four abstract bullets: start on one real problem, teach the loop rather than the tool, grant read-only access to real systems first, wire into existing environments and pipelines, let people work conversationally, widen blast radius only as proof accumulates, and capture what each cycle taught.
- A **"Proven in practice"** section in the README, stating the two delivered outcomes up front: the CMS API migration estimated at 8–10 weeks and delivered in about a day, and the production memory leak traced past its workaround and fixed at the root.
- `assets/social-preview.png` — a 1280×640 card used for the site's `og:image` and the repository social preview, with `assets/social-preview.svg` as the design source.

### Changed
- **Governance now states that the framework proposes no new access model.** AI works within the access the accountable person already holds — inherit, do not expand; existing controls apply unchanged; and the organization's own experts make the call. The question is not "is it safe to give AI access?" but "is this person's existing access appropriate, and am I comfortable with work being done through it?"
- **The monitoring gap is now stated as a requirement**, not an observation: `AI governance monitoring is required`. Approval gates stop the largest mistakes and attribution explains them afterwards, but nothing yet detects an agent acting outside intent within access it legitimately holds. Named as the most valuable unsolved problem in the space, including here.
- **Adoption is stated as carrying more weight than anything else.** Access can be arranged and controls written in a week; whether people actually work this way is what decides whether any of it mattered. Governance closes by deferring to it.
- **The website leads with the framework's name** rather than a positioning line, and the primary action is now Start rather than Explore.
- **README navigation now reaches every document.** Six docs — context engineering, proof, governance, adoption, roadmap and the agent-orchestration page — were previously unreachable from the README and discoverable only through internal links. Grouped now into the framework, going deeper, putting it to work, and beyond.
- **Orchestration is now framed as a layer above existing systems**, in the README, the website and the adoption doc — not a platform to migrate onto. Adoption is incremental and reversible; the systems underneath are unchanged, and removing the layer leaves no trace. Promoted from a caveat in "what it is not" to a positioning statement, with the honest qualifier that the layer still needs access, and that access should be scoped deliberately.
- Regraded the reference implementations. Cross-Team Knowledge Access has resolved **real production and support incidents** and reaches **rung 4–5** for those cases; Production Exception Remediation and Multi-Repository Defect Remediation have both run on real work through existing review and deployment approvals. None is an always-on capability or adopted organization-wide, and all still depend on a human providing the map, reviewing the output, and holding the approvals.

### Removed
- **The evidence ladder and the autonomy ladder as website sections.** Both remain part of the framework in `docs/07-proof.md` and `docs/08-governance.md`, where practitioners need them. On the site they asked a first-time reader to learn a grading scheme before they had done anything, and turned plain statements into jargon — "rung 4, not rung 5" instead of "the production cutover has not yet run." The site now states what has and has not been proven in plain words. Two full sections shorter.
- **The website's "Beyond software" section.** Three tabs restating the same six stages in slightly different vocabulary. The claim it existed to make — the loop is not software-specific — is now one line on the lifecycle.
- **Case study 03, "Contextual Reasoning in a Newborn Care Scenario."** It illustrated a model reasoning well about insufficient context, which is a property of the model rather than of orchestration. Nothing in it was set up, governed, or proven — it was good AI use, not orchestration work, and presenting it as evidence for this framework overstated what the framework had shown. The case-studies index and the website now carry outcome case studies and reference implementations only.
- `docs/06-agent-orchestration.md`. It was twenty lines, had no inbound links, and restated Principles 3 and 4 without adding to them. Its one distinctive line — keep execution observable, attributable, and reversible where practical — moved into governance.

### Changed — the website is shorter
- **Merged "Why orchestration" and "The problem" into one section.** Both argued that capability was never the bottleneck; saying it once says it harder.
- **"What it is not" is a two-column list rather than six cards**, with each entry cut to a line.
- **The evidence section is one tab group** — Contentful API migration, React memory leak, reference implementations — instead of stacked cards under two subheadings.
- Net effect: sixteen screens down to twelve, fifteen sections down to eleven, six tab groups down to four.

### Changed — how the work is described
- **Case studies are referred to by name, not by number.** "Contentful API migration," not "case study 01." The filenames keep their numeric prefix so the directory stays ordered, but nothing user-facing counts them.
- **Dropped "honestly reported."** Saying so implies other people do not, or that earlier reports here were not. The work either states what it has not proven or it does not; an adverb adds nothing.
- **The React case study now records what the investigation actually cost:** several days of repeated profiling, four candidate fixes implemented and disproved, a near-miss false positive caused by single runs draining on their own, and the fact that it looked like a Next.js defect until `global.Error` was instrumented to find the pinning object in React. Also states plainly that the leak is *not* caused by a failing dependency call retaining error objects — an intuitive reading the evidence contradicts, since the leak occurs on requests that succeed.

### Moved
- `docs/ai-future-hypothesis.md` → `hypothesis/ai-future.md`, out of `docs/` entirely. It is speculative and explicitly not part of the framework; keeping it beside the doctrine invited confusion.
- Broadened `docs/01-problem.md` so the problem statement is not framed as software-engineering-only. Software engineering remains where the framework was built and where its evidence comes from; the problem it addresses is not confined there.
- Replaced a competing slogan on the website ("An agent can act. Only orchestration learns.") with the canonical **"Agentic workflows repeat. Orchestration learns."**
- Added a framework-versus-runtime clarification to the README and the website: the framework defines the operating model around AI orchestration and does not prescribe the runtime used to execute it. Agent frameworks, workflow engines and tool protocols sit inside it.

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
