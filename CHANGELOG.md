# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- **The clover story.** The three clover sections and the closing question became one scrolling
  story: a clover pinned beside the steps, growing from three leaves to four to five as the argument
  does, with the leaf for the current stage lit. Each act has its own clover, so a leaf always jumps
  to a step in the act being read. Every leaf is labeled with the stage it stands for, and the label
  lights with the leaf. The four-stage act says only what *changes* when Context arrives rather than
  explaining Direction, Action and Success again. It ends on the unknown clover, where the whole mark
  goes to ink.
- **The common clover now says what is missing from it.** Two of its three stages rest on one human,
  who supplies both the Direction and the context behind it, which leaves very little for AI to act
  on. The lucky clover answers that: Context goes first because it is already there, in the systems
  the organization runs, so the work starts from reality rather than from somebody's memory of it.
- Scrolling drives the highlight and clicking a leaf jumps to where that stage is introduced.
  **Scrolling itself is never taken over.** The highlight is the step nearest the middle of the
  viewport, which reads the same going up as going down. The leaves are SVG anchors, so they are
  keyboard reachable, and without JavaScript every clover shows in full and every step reads as
  prose.
- **The site is six pages instead of one.** Getting started, Security and Evidence each have their
  own page, so a security lead can be sent `/security/` rather than an anchor two thirds of the way
  down. The home page keeps the whole argument — three stages, then four, then five, and the worked
  example — because that arc is the thing that would break if it were chopped up.
- **The setup instructions moved out of the lucky clover and into Getting started.** Read-only MCP
  servers, scoping to the human, starting in development. It was instruction sitting inside a story;
  the lucky clover now makes the argument and hands off.
- **`site/check.ps1`.** Six pages with no build step means the header, nav and footer are copied six
  times and will drift. It resolves every nav link to a site-root path and fails if the pages
  disagree, checks the asset versions match, and follows every relative link and every anchor.
- **Buttons in the hero.** Explore the framework, Getting started, and a plain link to the evidence.
  The page opened on prose with nothing to act on; there is now somewhere obvious to go from the top.

### Changed

- **The primary navigation is seven items instead of nine.** The three clover sections and the worked
  example moved into a **Framework** dropdown, and the remaining links are Getting started,
  Security, Evidence, Glossary, Author and GitHub. Security was not reachable from the nav before.
- On wide screens the dropdown is a panel with a one-line description under each link. Below 1000px
  it becomes an accordion inside the mobile menu, so the menu opens short and grows only when asked.
- It closes on an outside click, on Escape with focus returned to the button, and when any link
  inside it is followed. Without JavaScript the button is hidden and the panel renders inline, so
  every link stays reachable.
- Every link now points at `santhoshsathish94/clover-framework` after the repository rename.

## v1.0.2 — 2026-08-28

### Changed

- **The site has its own domain, cloverframework.com.** `site/CNAME` carries it, and the canonical
  links, `og:url` and the social card now point there rather than at the GitHub Pages subpath. The
  old address keeps working and redirects.
- **The header reads "Clover Framework"** rather than "Clover four stages".

## v1.0.1 — 2026-08-28

### Fixed

- **The navigation on phones.** Nine links wrapped onto three rows inside a sticky header, so the
  header alone took 183px — nearly a quarter of the screen, on every screen, all the way down the
  page. Below 1000px the links now collapse behind a **Menu** button and the header is 52px. The
  panel closes when a link is followed, when Escape is pressed, and when the window widens past the
  breakpoint. The button is hidden without JavaScript, where the nav stays open as before.
- **1000px is the breakpoint** because that is the narrowest width at which all nine links still sit
  on one row. An earlier 860px left a band of widths where the desktop nav wrapped to two rows.
- **Versioned `styles.css` and `app.js` URLs.** GitHub Pages sends `Cache-Control: max-age=600` on
  every file and they expire independently, so a returning visitor could get new HTML paired with a
  ten-minute-old stylesheet. That happened on the 1.0.0 deploy: the clover marks rendered unsized and
  the header collapsed, while the server was serving entirely correct files.

## v1.0.0 — 2026-08-28

### Renamed and rewritten as Clover

The framework is now **Clover**, an AI Orchestration Framework connecting real-world Context, human
Direction, AI-driven Action, and validated Success into a repeatable cycle. Four stages replace six:
Understand became Context, Opportunity became Direction, Plan and Execute merged into Action, and
Proof became Success. The six principles became five.

Context comes first. The common way of working is Direction → Action → Success, where context is
whatever the human remembers to hand over, so it arrives as a consequence of the direction. Clover
starts with Context because the systems are already running before anyone asks for anything, and
Direction is then given against what is actually there. Iteration feeds Context too: after each
success and each failure, the context files are written before the next attempt.

The names carry the argument, so they are worth stating. **Context** rather than Understand, because
understanding happens inside a head, while context is the material a system has to work from.
**Direction** rather than Control, because control implies people can perfectly steer a system that
keeps getting more capable. **Action** rather than Plan plus Execute, because the plan usually
changes once the work meets reality and splitting the two invites a plan that gets quietly
abandoned. **Success** rather than Proof or Results, because the question is whether the intended
outcome occurred and whether the real environment said so.

The rename ran through the repository as one change: the docs, `AGENTS.md`, the quickstart, the
brief template, the worked example, the issue and pull request templates, the case studies, the
website, and the README. Both case studies are retold through the stages with every fact left
as it was, including the two that are still open — the migration's production cutover has not run,
and the upstream React pull request is CI-green and not merged.

The clover carries the argument. Three leaves is the common clover, how AI is used almost everywhere
today. Four is the lucky clover, where Context becomes the systems an organization already runs and
arrives before the direction, and those four stages are the framework. Five is the growth clover:
Grow became **Growth**, and it sits outside the framework. It is what AI learns out of the four
stages, it belongs to the frontier AI companies and the volume of data everyone's usage generates,
and nobody in an organization operates it. Where repeated Growth ends is followed separately in
`hypothesis/ai-future.md`, kept out of the framework material, and it is a question rather than a
prediction.

This is a breaking change to the framework's vocabulary. Anything written against the six stages
needs remapping.

### Added
- **Rewrote the website's security and governance section around three separate questions**, because the old version mixed them together and was hard to reason about: *what is actually happening* (no new access, no new controls, and one real change — the layer reads across code, tickets, logs and data at once, and that aggregation is the genuinely new thing), *what needs to happen* (five concrete actions), and *what is not solved yet*. Adds the objection most security reviews actually open with — "there are secrets in our code" — and answers it directly: that is a true statement about your systems, not about AI. The credential is already readable by everyone with repository access. Declining AI does not remove the risk, it removes the thing most likely to find it. Rotate, redact, close the path, and the objection is gone while the system is genuinely safer. *The dangerous thing is not an agent reading a secret; it is a secret sitting there unread for three years.*
- **Monitoring is now framed as the primary recommendation rather than an open problem**, on the site and in `docs/08-governance.md`. Record every system an agent touched, compare what it did against what it was asked to do, and alert when it reaches outside the task — a repository unrelated to the ticket, a table it had no reason to query, a write where it was granted read. The honest caveat stays (tooling barely exists), but with the addition that most teams already collect the raw material in access logs and audit trails, so a coarse first version is tractable. It is the only control that operates *while* the agent is working.
- **A walkthrough section on the website, placed after the agent file** — the missing half of the story. Everything else describes the model; this runs one real problem through it end to end: new listings stopped appearing after a data load, the overnight investigation had already failed, and the team that built the synchronization had left. It shows what each piece of access actually answers (the repository, work tracking, logs, the datastore, a non-production environment, the running application), then the six stages with the human/AI split marked at each one, and closes on where the human matters — state the outcome so there is something to diverge from, notice divergence early while it is one wrong assumption rather than a day built on it, hold the approvals, and decide when the evidence is genuinely enough. "You stop doing the retrieval and start doing the direction."
- **An "agent file" section on the website, placed directly after the lifecycle** rather than buried in the closing steps. It explains what `AGENTS.md` is and why it is the intended route in: a person reading the docs takes an afternoon, an agent takes one file, and the person learns the loop by watching it run on their own work. Three tabs — what it makes an agent do, what it stops, and how it teaches you. Added to the primary navigation, and the Start step no longer repeats the explanation.
- **Adoption marked as delivered** in the README status, rather than pending. It is covered by the adoption guide, the orchestration environment doc, and the agent file, which together carry the model into a team without anyone having to read a specification first.
- **"How to carry yourself" in `AGENTS.md` section 1 — humility and courtesy as a working goal.** An agent that is technically right and exhausting to work with has failed at the part that matters. Assume you are the one more likely to be wrong; treat the person's account as outranking your reading of an artifact *about their own world*, since documents go stale and they were there — though not for conclusions you can check yourself; ask rather than accuse; admit error in one sentence without performing contrition; verify what genuinely matters and take the rest in good faith. **Courtesy governs how you say something, never whether you say it** — soften the delivery, never the substance, because an agent that goes along with whatever it is told is worth nothing and the person can tell. Guide rather than concede: if the direction will not work, say so once with the reason and a better option beside it, then respect the decision, note what you expect to go wrong, and get on with the work. The person should finish feeling helped, not inspected — and better off for having disagreed with you.
- **`AGENTS.md` section 9 — teach the person you are working with.** Most people who encounter this framework will encounter it through an agent, not through `docs/`, because asking is faster and clearer than reading a specification. The agent is therefore the most likely teacher whether or not anyone planned it. The section instructs it to name the stage it is in and why, give the reason behind every request for access or approval, offer to set the flow up rather than wait to be asked, explain deliberate-looking hesitation, and match the person's experience level. Bounded by two limits that pull against each other: teaching is not lecturing, and teaching is not criticising — correct the work rather than the person, raise a concern once and let it go, and do not narrate every reservation, since flattery and nagging are two ways of failing the same person.
- `AGENTS.md` — the entire operating model written as **instructions for an AI agent**, in one self-contained file. Covers the six stages, the session-start context read, evidence gathering, a self-check against known failure modes, stating what the evidence actually was, the limits of an agent's authority, teaching the person it works with, and what to write back before finishing. A human needs the full framework; an agent can be pointed at this one file.
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
- **The evidence ladder and the autonomy ladder, everywhere.** Numbered rungs 1–5 and autonomy levels L0–L4 are gone from the docs, `AGENTS.md`, the Quickstart, the brief template, the PR template, the worked example, both glossaries and the website. Grading work on a scale invited the behaviour the framework exists to prevent: "rung 4" is a score, and a score is easier to claim than to justify — it also let a narrative anecdote and a harness with 36 enumerated cases sit at the same number. What replaces it is the same discipline in plain language, **state what you checked, what you observed, and where you stopped**, and for autonomy three rules instead of five levels: results decide rather than confidence, blast radius overrides track record, and it is granted per context rather than globally. The standard did not change; only the pretence that it could be expressed as a number.
- **The website's "Beyond software" section.** Three tabs restating the same six stages in slightly different vocabulary. The claim it existed to make — the loop is not software-specific — is now one line on the lifecycle.
- **Case study 03, "Contextual Reasoning in a Newborn Care Scenario."** It illustrated a model reasoning well about insufficient context, which is a property of the model rather than of orchestration. Nothing in it was set up, governed, or proven — it was good AI use, not orchestration work, and presenting it as evidence for this framework overstated what the framework had shown. The case-studies index and the website now carry outcome case studies and reference implementations only.
- `docs/06-agent-orchestration.md`. It was twenty lines, had no inbound links, and restated Principles 3 and 4 without adding to them. Its one distinctive line — keep execution observable, attributable, and reversible where practical — moved into governance.

### Changed — the website is shorter
- **Deleted the "Run one cycle on something real" section.** Once the agent-file section existed, it was saying the same thing twice — the three start steps now live at the end of that section, where someone has just read what the file does and is ready to use it. The quickstart, brief template and worked example are one line of links rather than three cards.
- **The README lost a third of its length.** Cut "Why this matters" (six bullets that could have described any framework), the duplicate reference-implementations list, and the "Current Status" checklist of green ticks. The thirty-link "Explore the Framework" index became five grouped lines. 239 lines to 189.
- **Merged "Why orchestration" and "The problem" into one section.** Both argued that capability was never the bottleneck; saying it once says it harder.
- **"What it is not" is a two-column list rather than six cards**, with each entry cut to a line.
- **The evidence section is one tab group** — Contentful API migration, React memory leak, reference implementations — instead of stacked cards under two subheadings.
- Net effect: sixteen screens down to twelve, fifteen sections down to eleven, six tab groups down to four.

### Changed — how the work is described
- **The migration's performance figures now say where they were measured.** They come from a committed script running both services on one developer machine — warm-up, then 400 requests at 40 concurrency across four endpoints, plus a 120-request invalid-slug burst. No load test has been run against deployed infrastructure; the multi-regime test that was written was never executed, and the comparison report it was meant to populate was never generated. The numbers are real and reproducible; they are not production evidence, and the case study now says so above the table.
- **Performance is credited to the architecture, not to AI.** One REST fetch instead of 2–3 GraphQL round trips, a slug allow-list rejecting junk before it reaches the CMS, and Brotli on a previously uncompressed payload. A team writing the same design by hand would have measured the same gains. What AI changed was the cost of attempting the rewrite — a claim about effort, not latency. The results table is split accordingly.
- **Stated that the parity suite was a one-time migration gate**, removed from CI once it had served its purpose because it needs both services running side by side. 36/36 is point-in-time, not continuously enforced.
- **"About a day" now says what it measures.** It is the *execution* time for the CMS API migration, run with agents and subagents. Testing and parity validation took roughly another day, and stakeholder agreement longer still; the work was not continuous. Setting one day against an 8–10 week estimate that included analysis, review and coordination overstates the gain, and the case study, README, index, website and profile now all say so. Added as a takeaway in its own right: execution stopped being the expensive part, which moves the bottleneck rather than removing it.
- **`docs/reference-implementations.md` said "Both" while describing three patterns** — left over from when there were two.
- **Case studies are referred to by name, not by number.** "Contentful API migration," not "case study 01." The filenames keep their numeric prefix so the directory stays ordered, but nothing user-facing counts them.
- **Dropped "honestly reported."** Saying so implies other people do not, or that earlier reports here were not. The work either states what it has not proven or it does not; an adverb adds nothing.
- **The React case study now records what the investigation actually cost:** several days of repeated profiling, four candidate fixes implemented and disproved, two separate false conclusions (a single run draining on its own, and a dead local endpoint that manufactured a leak), and the fact that it looked like a Next.js defect until `global.Error` was instrumented to find the pinning object in React.
- **The React case study now separates the two paths to the same pin.** Renders that *fail* retain a reason `Error` via an `AbortSignal` reason, a Flight stream's closed-reason, or a rejected promise — this is the dominant production path, measured at 8,833 aborted-with-reason signals and ~1.96M retained promises on one leaking pod. Renders that *succeed* hit the same pin because React constructs an `Error` itself on the completion path — the defect fixed upstream. Conflating the two cost time during the investigation and had been flattened into a single mechanism in the write-up.
- **Added the fleet A/B that validated the mitigation:** the same container image under sustained load, differing only by `--stack-trace-limit=0` — 113 restarts across 53 pods without it, zero across 36 pods with it over ~6.5 hours. Stated as validation of the blunt mitigation, not of the upstream patch, and noting that the surviving ~1.8 GB is bounded rather than eliminated.

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
