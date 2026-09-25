export const exercises = [
  {
    id: 'audit', title: 'Read your CV like a selector', short: 'CV diagnostic', minutes: 10, slide: 6, section: '01 / Diagnose',
    intro: 'Find what a reader can prove about you in the first 30 seconds.',
    output: 'A clear first-page diagnosis and three priority changes.',
    steps: ['Open your current CV beside this hub. Use one target from your Homework 3 portfolio as context.', 'Scan the first page for 30 seconds. Record what is visible, not what you know about yourself.', 'Identify one strong research signal, one missing signal and three changes to prioritise.'],
    fields: [
      ['target', 'Target PhD role or research lane', 'Use your own shortlisted role. If you have no vacancy yet, name a provisional research lane.'],
      ['signal', 'What does page one currently prove?', 'Name a specific project, method, research contribution or output that is immediately visible.'],
      ['missing', 'What important evidence is hidden or missing?', 'What would a selector struggle to find or understand?'],
      ['changes', 'My three priority changes', '1. Move…\n2. Clarify…\n3. Remove or shorten…']
    ],
    check: ['I distinguish evidence from general claims.', 'My three changes are concrete enough to make today.'],
    share: 'Share one change you will make and why it helps the reader. Do not paste your whole CV into Meet chat.',
    cue: 'Allow 10 minutes of silent work, then invite two volunteers for 60 seconds each. Ask “Where is the evidence?” rather than scoring people against each other.',
    example: 'Weak signal: “Passionate about research.” Stronger signal: a visible thesis entry naming the scientific problem, your method and your own contribution.'
  },
  {
    id: 'structure', title: 'Design an evidence-first structure', short: 'CV structure', minutes: 12, slide: 9, section: '02 / Structure',
    intro: 'Build a reading order that makes your strongest relevant evidence easy to find.',
    output: 'A first-page plan and an ordered CV outline.',
    steps: ['List the sections you actually need. Do not add empty sections to imitate a senior researcher.', 'Decide what belongs on page one for your target. Follow any advertised format or length requirements.', 'Write the section order and explain one deliberate change from your current CV.'],
    fields: [
      ['order', 'My section order', 'For example: contact header → education → research experience → selected outputs → methods → relevant awards / teaching. Adapt to your evidence.'],
      ['pageone', 'What must appear on page one?', 'List the 3–4 most useful pieces of information for this target.'],
      ['decision', 'One section I will move, merge or shorten — and why', 'Describe the change and the evidence it makes easier to see.'],
      ['format', 'Target-specific format requirements or unknowns', 'Record the stated page limit / template / file format, or write “not specified” / “still to verify”.']
    ],
    check: ['The outline matches evidence I actually have.', 'I have checked or flagged the target’s formatting instructions.'],
    share: 'Explain one ordering choice in 45 seconds. Other participants compare silently with their own outline.',
    cue: 'Teach that section order is a reasoned choice, not a universal template. Use an anonymised outline for whole-room discussion.',
    example: 'An applicant with substantial research experience may foreground it. A recent graduate may put education and a detailed thesis entry near the top. Relevance and clarity matter more than rigid ordering.'
  },
  {
    id: 'evidence', title: 'Unpack one research experience', short: 'Evidence inventory', minutes: 15, slide: 13, section: '03 / Find evidence',
    intro: 'Separate the project’s story from the work you personally did.',
    output: 'One defensible research-experience record.',
    steps: ['Choose a thesis, internship, research project or substantial assessed project you can discuss honestly.', 'Record the problem, your personal contribution, the methods and the evidence of progress or output.', 'If the work is ongoing or produced a negative result, describe that accurately. Do not invent a success metric.'],
    fields: [
      ['project', 'Experience and context', 'Project / role / institution / dates. Use a short label if you prefer not to store identifying details.'],
      ['problem', 'What research problem or question did it address?', 'A specific scientific or technical question, not only a broad topic.'],
      ['contribution', 'What did I personally do?', 'Separate your decisions and tasks from the team’s work.'],
      ['methods', 'Which methods did I use, and how?', 'Name the method or tool, what you used it for, and your level of responsibility.'],
      ['output', 'What resulted, and what evidence can I show?', 'A finding, dataset, analysis, code, report, poster, protocol or documented learning. If ongoing, say so.']
    ],
    check: ['My own contribution is distinct from the team’s.', 'Every outcome or number can be supported.'],
    share: 'Share one contribution sentence only. You can pass; nobody needs to reveal unpublished or confidential work.',
    cue: 'Choose two volunteers from different fields. Use the same problem → contribution → method → evidence questions for both.',
    example: 'A defensible output need not be a paper. A validated analysis pipeline, well-documented experiment or thesis can be meaningful evidence when its scope and your contribution are clear.'
  },
  {
    id: 'bullets', title: 'Turn experience into CV bullets', short: 'Research bullets', minutes: 15, slide: 16, section: '04 / Write clearly',
    intro: 'Write concise research statements that show action, method and purpose or outcome.',
    output: 'Three revised CV bullets with a factual self-check.',
    steps: ['Use the evidence record from Exercise 3. Pick one vague line from your current CV.', 'Draft three bullets. Include what you did, the method or context, and the outcome or purpose where supported.', 'Remove inflated language and unsupported numbers. Keep technical detail that helps establish fit.'],
    fields: [
      ['before', 'Original line to improve', 'Paste a vague or overloaded line from your current CV, or write one you would otherwise use.'],
      ['bullet1', 'Revised bullet 1 — contribution', 'Start with an accurate action verb, then describe your contribution.'],
      ['bullet2', 'Revised bullet 2 — method and purpose', 'Explain what you used and why. Avoid a disconnected list of tools.'],
      ['bullet3', 'Revised bullet 3 — outcome or progress', 'Use a supported result, output or clearly labelled ongoing contribution.'],
      ['proof', 'Factual check: what supports these claims?', 'Name the record or experience that supports each claim. Flag any wording you still need to verify.']
    ],
    check: ['The bullets say what I did, not only what the group did.', 'Metrics, authorship and outcomes are accurate.'],
    share: 'Read one before-and-after pair aloud. The room gives feedback on clarity and evidence, not on the prestige of the experience.',
    cue: 'Invite two volunteers. Ask the room to identify the action, method and purpose / outcome. Let participants revise their own drafts after the debrief.',
    example: 'Illustrative wording only: “Implemented a Python preprocessing pipeline for microscopy images and documented quality-control checks for the project dataset.” Use only claims true of your own work.'
  },
  {
    id: 'claims', title: 'Audit skills and research outputs', short: 'Claims & outputs', minutes: 12, slide: 20, section: '05 / Keep it accurate',
    intro: 'Make every skill and output precise enough to defend in an interview.',
    output: 'A supported methods list and an accurate output-status check.',
    steps: ['Select three relevant methods or tools. For each, explain where you used it and what you can do independently.', 'Review every publication, preprint, poster, project or manuscript label. A submitted paper is not accepted; an abstract is not a full article.', 'Identify one claim to correct, qualify or remove. If you have no publications, use genuine project / thesis outputs without relabelling them.'],
    fields: [
      ['skill1', 'Method 1 — use and level', 'Method / where used / what I can do independently or with supervision.'],
      ['skill2', 'Method 2 — use and level', 'Method / where used / what I can do independently or with supervision.'],
      ['skill3', 'Method 3 — use and level', 'Method / where used / what I can do independently or with supervision.'],
      ['outputs', 'Outputs and their exact status', 'List relevant items as published, accepted, preprint, submitted, in preparation, poster, code, thesis, etc. “No outputs to list yet” is an honest answer.'],
      ['correction', 'One claim to correct, qualify or remove', 'Record the change, or explain what you checked if no correction is needed.']
    ],
    check: ['Skill levels reflect actual experience.', 'Research-output types and statuses are not overstated.'],
    share: 'Share one general lesson about accurate labelling. Keep manuscript details private if needed.',
    cue: 'Use invented examples to discuss publication status. Do not display a participant’s CV or output list without their explicit consent.',
    example: '“Familiar with qPCR through supervised training” and “Independently planned and analysed qPCR experiments” describe different evidence. Use the wording you can defend.'
  },
  {
    id: 'tailor', title: 'Build your target-ready revision plan', short: 'Targeted revision', minutes: 15, slide: 23, section: '06 / Bring it together',
    intro: 'Connect three target requirements to evidence already in your CV, then plan the next revision.',
    output: 'A requirement–evidence map and a practical CV revision plan.',
    steps: ['Return to one official vacancy from Homework 3. Use its actual wording for three relevant requirements.', 'For each requirement, identify your matching evidence and where it should appear. Say “gap” when evidence is missing.', 'Choose the first three CV changes and a personal deadline. This is a focused CV practice task; deeper application tailoring can follow in a later session.'],
    fields: [
      ['source', 'Target role and official source', 'Position / institution / official URL or saved advertisement title. If using a provisional target, label it clearly.'],
      ['match1', 'Requirement 1 → my evidence → CV location', 'Distinguish mandatory from desirable. Do not treat a genuine eligibility gap as a wording problem.'],
      ['match2', 'Requirement 2 → my evidence → CV location', 'Record the evidence, or name the gap and what you need to verify.'],
      ['match3', 'Requirement 3 → my evidence → CV location', 'Show relevance without copying claims you cannot support.'],
      ['actions', 'My next three CV edits and personal deadline', '1. …\n2. …\n3. …\nI will complete this revision by: …']
    ],
    check: ['Each requirement is linked to genuine evidence or an explicit gap.', 'My next three edits and personal deadline are clear.'],
    share: 'Finish with a 30-second commitment: “My most important CV change is…, because…”. Sharing is voluntary.',
    cue: 'Use a whole-room exit round if time allows. Remind participants to export their responses and revise the actual CV document after class. Nothing is submitted automatically.',
    example: 'Requirement: experience with numerical modelling. Evidence: your own simulation project and validation work. CV location: the relevant research entry plus a supported methods section. Do not claim an unfamiliar package to match a keyword.'
  }
];

export const slides = [
 ['Session 4: the academic CV studio', 'Turn your research experience into clear, accurate evidence for a PhD application.', 'Today’s goal is a stronger CV revision plan, not a guaranteed application outcome.'],
 ['Your working materials', 'Open your current CV, your Session 2 evidence inventory and your Session 3 opportunity portfolio.', 'If something is missing, use a provisional research lane and a real project. Label assumptions.'],
 ['Four-hour workshop rhythm', 'Short teaching blocks → silent individual exercises → voluntary main-room debriefs.', 'Keep Google Meet open. No breakout rooms, required peer pairing or automatic sharing.'],
 ['What a CV must make visible', 'Research readiness, relevant methods, your contribution and defensible outputs.', 'A CV is evidence selection, not an autobiography. Follow the vacancy’s own instructions.'],
 ['The 30-second scan', 'Can a reader locate your education, research focus, strongest relevant experience and methods?', 'Look for hidden evidence, generic claims and unexplained acronyms.'],
 ['Exercise 1 · CV diagnostic', 'Work individually for 10 minutes: audit page one and identify three changes.', 'Debrief: two volunteers share one change and its reason.'],
 ['Evidence before decoration', 'Make headings, dates and project descriptions easy to scan.', 'Keep a complete master record; choose relevant evidence deliberately for the target version.'],
 ['Choose a useful section order', 'Education, research, outputs, methods, awards and teaching are possibilities, not mandatory empty headings.', 'Do not invent a universal page limit. Check the target instructions.'],
 ['Exercise 2 · CV structure', 'Work individually for 12 minutes: plan the section order and first page.', 'Debrief: explain one ordering choice.'],
 ['Break 1 · 10 minutes', 'Step away from the screen. Leave this tab open.', 'Return with one research experience to unpack.'],
 ['The anatomy of research evidence', 'Problem → personal contribution → methods → result or documented progress.', 'Separate what the group achieved from what you personally did.'],
 ['Evidence beyond publications', 'A thesis, dataset, analysis, protocol, codebase or report can demonstrate research work.', 'Describe the actual status and limitations. Never invent numbers.'],
 ['Exercise 3 · Evidence inventory', 'Work individually for 15 minutes: unpack one research experience.', 'Debrief: share only a contribution sentence, if comfortable.'],
 ['From task lists to contribution', 'Replace vague duties with an accurate action and enough scientific context.', 'Make the method’s purpose visible; a tool list alone does not establish research ability.'],
 ['Write a defensible bullet', 'Action + method or context + supported purpose / outcome.', 'Use precise verbs. Distinguish independent work, supervised work and collaboration.'],
 ['Exercise 4 · Research bullets', 'Work individually for 15 minutes: draft three bullets and verify the claims.', 'Debrief: read one before-and-after pair, then revise.'],
 ['Break 2 · 10 minutes', 'Pause and return ready to audit methods and outputs.', 'Your local responses remain in this browser if storage is available.'],
 ['Skills need context', 'For each method, record where you used it and what you can actually do.', 'Distinguish independent practice, supervised use and introductory familiarity.'],
 ['Name outputs accurately', 'Published, accepted, preprint, submitted and in preparation are different statuses.', 'Separate full articles, conference abstracts, posters and project outputs.'],
 ['Exercise 5 · Claims and outputs', 'Work individually for 12 minutes: audit three methods and output labels.', 'Debrief: discuss a general accuracy lesson without revealing confidential work.'],
 ['A focused tailoring check', 'Choose one official target from Homework 3 and identify three relevant requirements.', 'Distinguish mandatory criteria from desirable experience. Wording cannot solve ineligibility.'],
 ['Requirements meet evidence', 'Map each requirement to genuine evidence and a useful CV location.', 'Reorder or clarify relevant facts. Do not manufacture a skill or achievement.'],
 ['Exercise 6 · Targeted revision', 'Work individually for 15 minutes: map requirements and plan three CV edits.', 'Choose a personal deadline and prepare a brief, voluntary exit reflection.'],
 ['Review, export, revise', 'Review all six exercises, download your responses and update the actual CV.', 'Nothing is submitted automatically. Share the exported file only through the facilitator’s agreed channel.']
];

export const agenda = [
 ['00:00–00:20','Opening & Homework 3 bridge','1–4'],
 ['00:20–00:45','CV diagnostic · Exercise 1','5–6'],
 ['00:45–01:10','CV structure · Exercise 2','7–9'],
 ['01:10–01:20','Break','10'],
 ['01:20–01:50','Evidence inventory · Exercise 3','11–13'],
 ['01:50–02:20','Research bullets · Exercise 4','14–16'],
 ['02:20–02:30','Break','17'],
 ['02:30–03:00','Claims & outputs · Exercise 5','18–20'],
 ['03:00–03:35','Focused tailoring · Exercise 6','21–23'],
 ['03:35–04:00','Review, questions & revision plan','24']
];
