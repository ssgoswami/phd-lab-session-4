import { exercises, slides, agenda } from './content.js';
import { answerSheet, createAnswerPdf } from './export.js';

const KEY = 'phd-lab-session-4-v1';
const fresh = () => ({version:1,name:'',lane:'',answers:{},ready:{},checks:{},updated:null});
let state = fresh(), storageOK = true, corrupt = false;
try { const saved=localStorage.getItem(KEY); if(saved) state=normalise(JSON.parse(saved)); } catch {storageOK=false;corrupt=true;}
let page = 'overview', active = 0, cueSlide = 1, toastTimer, exportJob=0;
const clocks=exercises.map(e=>({remaining:e.minutes*60,running:false,ends:0}));
const $ = (s) => document.querySelector(s);
const esc = (v) => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = (name, size=20) => {
 const paths={arrow:'M5 12h14m-6-6 6 6-6 6',back:'M19 12H5m6-6-6 6 6 6',check:'m5 12 4 4L19 6',lock:'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z',book:'M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1m0-16c4-3 8-2 10-1v16c-4-2-7-1-10 1V5',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',clock:'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',screen:'M3 3h18v14H3zM12 17v4m-5 0h10',close:'m6 6 12 12M6 18 18 6',leaf:'M19 3C7 3 3 7 5 15c8 2 12-2 14-12ZM5 20 15 9'};
 return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.book}"/></svg>`;
};
function normalise(d) {
 if(!d||d.version!==1||typeof d.answers!=='object'||Array.isArray(d.answers)||d.answers===null) throw Error('This is not a Session 4 backup.');
 const clean=fresh();
 for(const k of ['name','lane']) clean[k]=typeof d[k]==='string'?d[k].slice(0,300):'';
 for(const e of exercises){
   clean.answers[e.id]={};
   for(const [key] of e.fields) clean.answers[e.id][key]=typeof d.answers?.[e.id]?.[key]==='string'?d.answers[e.id][key].slice(0,12000):'';
   clean.checks[e.id]=e.check.map((_,i)=>d.checks?.[e.id]?.[i]===true);
   clean.ready[e.id]=d.ready?.[e.id]===true&&e.fields.every(([k])=>clean.answers[e.id][k].trim())&&clean.checks[e.id].every(Boolean);
 }
 clean.updated=typeof d.updated==='string'?d.updated:null;
 return clean;
}
const answer = (e,k) => state.answers[e.id]?.[k]||'';
const filled = (e) => e.fields.filter(([k])=>answer(e,k).trim()).length;
const count = () => exercises.filter(e=>state.ready[e.id]).length;
const status = (e) => state.ready[e.id]?'Ready':filled(e)?'In progress':'Not started';
const savingText = () => storageOK?'Saved in this browser':'Not saved · export a backup';
function save(){
 state.updated=new Date().toISOString();
 if(!corrupt){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}}
 refreshProgress();
}
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4000);}
function route(){
 const hash=location.hash.slice(1);
 if(hash==='review'){page='review';}else if(hash==='guide'){page='guide';}else if(/^exercise-[1-6]$/.test(hash)){page='exercise';active=Number(hash.split('-')[1])-1;}else{page='overview';}
 render();
}
function go(hash){if(location.hash==='#'+hash)route();else location.hash=hash;}
function render(){
 $('#app').innerHTML=`
 <aside class="sidebar" aria-label="Session navigation">
  <a class="brand" href="#overview"><span class="brand-mark">${icon('leaf',25)}</span><span>PhD Application Lab<small>RESEARCHER IN THE MAKING</small></span></a>
  <div class="session-label">THE STEM COHORT <span>2026</span></div>
  <div class="session-title"><span class="session-num">04</span><div>Academic CV studio<small>Live exercise companion</small></div></div>
  <a href="#overview" class="nav-top ${page==='overview'?'selected':''}">${icon('book')} Session overview</a>
  <div class="nav-label">YOUR SIX EXERCISES</div>
  <nav class="exercise-nav">${exercises.map((e,i)=>`<a href="#exercise-${i+1}" data-nav="${e.id}" class="${page==='exercise'&&active===i?'selected':''}" ${page==='exercise'&&active===i?'aria-current="step"':''}><span class="step-number">${state.ready[e.id]?icon('check',15):String(i+1).padStart(2,'0')}</span><span>${e.short}<small>${status(e)}</small></span></a>`).join('')}</nav>
  <a href="#review" class="nav-top ${page==='review'?'selected':''}">${icon('check')} Final review <span class="review-count">${count()}/6</span></a>
  <div class="side-bottom"><div class="progress-line"><span>Your progress</span><strong data-total>${count()} of 6 ready</strong></div><progress max="6" value="${count()}" aria-label="Exercises marked ready"></progress><div class="local-note">${icon('lock',15)} Your answers stay on this device.</div><a href="#guide" class="guide-link">${icon('screen',17)} Facilitator guide & slide map</a></div>
 </aside>
 <div class="app-body"><header class="topbar"><div class="breadcrumb">THE APPLICATION LAB <span>/</span> SESSION 04</div><div class="save-status ${storageOK?'':'warning'}" role="status"><span class="status-dot"></span><span data-save>${savingText()}</span></div></header>
 <main id="main" tabindex="-1">${!storageOK?'<div class="warning-banner">Browser saving is unavailable or a saved file could not be read. Your current answers work in this tab. Download a backup before leaving. Existing unreadable data will not be overwritten.</div>':''}${page==='overview'?overview():page==='exercise'?workspace():page==='review'?review():guide()}</main>
 <footer class="footer"><span>PhD Application Lab · Dr. Subhra Sundar Goswami</span><span>Think clearly. Show evidence. Build your next step.</span></footer></div>`;
 bind();refreshProgress();
}
function overview(){return `
 <section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="tiny-pill">SESSION 04</span> THE ACADEMIC CV STUDIO</div><h1>Your research.<br>Your evidence.<br><em>A stronger CV.</em></h1><p>Turn what you’ve done into a clear, credible research story. Six individual exercises, one shared room, a practical revision plan.</p><button class="primary" data-action="resume">${count()===6?'Review your work':exercises.some(e=>filled(e))?'Continue your work':'Enter the CV studio'} ${icon('arrow')}</button><div class="hero-meta"><span>${icon('clock',16)} 4-hour live workshop</span><span>${icon('book',16)} 6 individual exercises</span></div></div>
 <div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="paper-sheet"><div class="paper-top"><span>YOUR RESEARCH CV</span><span>↗</span></div><div class="paper-title">Evidence<br>over adjectives.</div><div class="paper-line long"></div><div class="paper-line mid"></div><div class="paper-section">RESEARCH EXPERIENCE</div><div class="paper-bullet"><i></i><div><b></b><b></b></div></div><div class="paper-bullet"><i></i><div><b></b><b></b></div></div><div class="paper-section">METHODS & CONTRIBUTIONS</div><div class="art-chips"><span>Problem</span><span>Method</span><span>Evidence</span></div></div><div class="art-sticker">A clearer story.<br><strong>Still entirely yours.</strong></div><div class="art-caption">FROM EXPERIENCE → TO EVIDENCE</div></div></section>
 <section class="setup-section"><div><div class="eyebrow">BEFORE YOU BEGIN</div><h2>Make this your workspace.</h2><p class="muted">Open your current CV and your Session 3 shortlist. A name or nickname is optional and used only in your exports.</p></div><div class="identity-fields"><label>Your name or nickname <span>Optional</span><input id="participant-name" data-profile="name" value="${esc(state.name)}" maxlength="300" placeholder="How you’d like to label your work"></label><label>Your research lane <span>Optional</span><input id="participant-lane" data-profile="lane" value="${esc(state.lane)}" maxlength="300" placeholder="e.g. computational biology"></label></div></section>
 <section class="journey"><div class="section-heading"><div><div class="eyebrow">TODAY’S PATH</div><h2>Small steps. Stronger evidence.</h2></div><a href="#guide" class="text-link">View teaching outline ${icon('arrow',16)}</a></div><div class="journey-grid">${exercises.map((e,i)=>`<a class="journey-card" href="#exercise-${i+1}"><div class="card-top"><span class="card-index">0${i+1}</span><span class="duration">${e.minutes} min</span></div><h3>${e.short}</h3><p>${e.output}</p><div class="card-bottom"><span class="state-pill ${state.ready[e.id]?'done':''}">${status(e)}</span>${icon('arrow',18)}</div></a>`).join('')}</div>
 <div class="meet-banner"><span class="meet-icon">${icon('screen',23)}</span><div><strong>Individual thinking. Shared learning.</strong><p>Stay in the main Google Meet room. Work quietly when prompted, then share one answer only if you choose. The timer and progress are personal, not synchronised across the cohort.</p></div></div>
 <details class="privacy-details"><summary>Saving, privacy & presentation references</summary><p>Answers are stored locally in this browser, not submitted to the facilitator or synced to another device. Anyone using this browser profile may be able to see them. Avoid storing confidential research or personal contact details. Browser storage can be cleared; export a backup regularly.</p><p>This is a new Session 4 teaching outline based on the academic-CV session topic and the Session 3 homework bridge. No Session 4 PowerPoint was available to verify. “Hub slide” numbers refer to the built-in 24-slide teaching cues, not an existing PPT.</p><div class="button-row"><button class="secondary" data-action="backup">Download backup</button><button class="secondary" data-action="import">Restore backup</button></div></details></section>`;}
function workspace(){const e=exercises[active];return `
 <div class="workspace-heading"><div><div class="eyebrow">EXERCISE 0${active+1} <span class="eyebrow-divider">/</span> 06 · ${e.section.split('/')[1]}</div><h1 class="page-title">${e.title}</h1><p class="subtitle">${e.intro}</p></div><button class="slide-chip" data-slide="${e.slide}">${icon('screen',16)} Hub slide ${String(e.slide).padStart(2,'0')} ↗</button></div>
 <div class="workspace-grid"><div class="writing-column"><section class="instruction-card"><div class="eyebrow">YOUR TASK</div><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="output-note"><strong>Leave with</strong><span>${e.output}</span></div></section>
 <section class="response-card"><div class="response-head"><h2>Your working notes</h2><span data-fields>${filled(e)} / ${e.fields.length} prompts answered</span></div><p class="muted small">Draft in your own words. Every prompt needs an answer before you mark this exercise ready; “not applicable” with a reason is valid.</p><form id="response-form" novalidate>${e.fields.map(([k,label,hint],i)=>`<div class="field"><label for="field-${k}"><span class="field-index">${String(i+1).padStart(2,'0')}</span>${label}</label><p id="hint-${k}">${hint}</p><textarea id="field-${k}" name="${k}" data-answer="${k}" rows="${['order','actions','changes'].includes(k)?4:3}" maxlength="12000" aria-describedby="hint-${k}" placeholder="Write your response here…">${esc(answer(e,k))}</textarea></div>`).join('')}</form>
 <div class="self-check"><h3>Before you mark this ready</h3>${e.check.map((s,i)=>`<label class="check-row"><input type="checkbox" data-check="${i}" ${state.checks[e.id]?.[i]?'checked':''}><span>${s}</span></label>`).join('')}</div><p id="validation" class="validation" role="alert"></p><div class="complete-row"><span class="ready-message">${state.ready[e.id]?'✓ Ready for your final review':'Your draft is saved as you write.'}</span><button class="primary" data-action="complete">${state.ready[e.id]?'Marked ready':'Mark exercise ready'} ${icon('check',18)}</button></div></section>
 <div class="exercise-pager"><a class="secondary" href="${active===0?'#overview':`#exercise-${active}`}">${icon('back',17)} ${active===0?'Overview':'Previous'}</a><a class="text-link" href="${active===5?'#review':`#exercise-${active+2}`}">${active===5?'Go to final review':'Next exercise'} ${icon('arrow',18)}</a></div></div>
 <aside class="work-aside"><section class="timer-card"><div class="eyebrow">INDIVIDUAL WORK TIME</div><div class="timer-digits" data-clock>${clockText(active)}</div><p>Start when your facilitator says “go”.</p><div class="button-row"><button class="secondary" data-action="timer">${clocks[active].running?'Pause':'Start timer'}</button><button class="icon-button" data-action="reset-timer" aria-label="Reset exercise timer">↺</button></div><small>Personal timer · no auto-submit</small></section>
 <section class="aside-note"><div class="eyebrow">IN THE MEET ROOM</div><h3>One answer is enough.</h3><p>${e.share}</p><span class="soft-tag">Sharing is always voluntary</span></section><details class="example"><summary>Need a little guidance?</summary><p>${e.example}</p></details><div class="quiet-note">${icon('lock',16)}<p>These notes stay in this browser profile. Keep private details out of screen shares.</p></div></aside></div>`;}
function review(){return `
 <div class="eyebrow">YOUR SESSION 04 TAKEAWAY</div><div class="review-hero"><div><h1 class="page-title">See the story coming together.</h1><p class="subtitle">${state.name?`${esc(state.name)}, your`:'Your'} working notes, all in one place. Revisit any exercise before exporting.</p></div><div class="completion-ring"><strong>${count()}<span>/6</span></strong><small>exercises ready</small></div></div>
 <div class="review-actions"><div><strong>${count()===6?'All six exercises are ready for review.':'This is a working draft — and that’s okay.'}</strong><p>Save all six exercises with your answers, including any drafts. Nothing is sent automatically.</p></div><button class="primary" data-action="export">${icon('download',18)} Download answers (PDF)</button></div>
 <div class="button-row export-options"><button class="secondary" data-action="text-export">Copy / download text</button><button class="secondary" data-action="print">Print answer sheet</button><button class="secondary" data-action="backup">Download backup (.json)</button><button class="secondary" data-action="import">Restore backup</button></div>
 <p class="export-help">The PDF button opens a save panel. Wait for “PDF ready”, then choose <strong>Save PDF</strong>. If your browser blocks a download, use <strong>Open PDF</strong> or copy the answer sheet from the panel.</p>
 <div class="review-list">${exercises.map((e,i)=>`<section class="review-card"><div class="review-card-head"><div><span class="eyebrow">EXERCISE 0${i+1} · HUB SLIDE ${e.slide}</span><h2>${e.short}</h2></div><div><span class="state-pill ${state.ready[e.id]?'done':''}">${status(e)}</span><a class="edit-link" href="#exercise-${i+1}">Edit ${icon('arrow',15)}</a></div></div><dl>${e.fields.map(([k,label])=>`<div><dt>${label}</dt><dd class="${answer(e,k).trim()?'':'unanswered'}">${answer(e,k).trim()?esc(answer(e,k)):'Not answered yet'}</dd></div>`).join('')}</dl><div class="review-checks">Self-check: ${e.check.filter((_,j)=>state.checks[e.id]?.[j]).length} / ${e.check.length} confirmed</div></section>`).join('')}</div>
 <div class="finish-note"><h2>Now revise the real CV.</h2><p>Use your Exercise 6 plan to update your CV document. Exported notes are a working companion, not a finished CV. Use the facilitator’s agreed channel if you choose to share your work.</p><button class="text-button danger" data-action="clear">Clear my local responses</button></div>`;}
function guide(){return `
 <div class="eyebrow">FACILITATOR VIEW · ONE GOOGLE MEET ROOM</div><h1 class="page-title">A clear cue for every exercise.</h1><p class="subtitle">A proposed four-hour Session 4 flow, with built-in teaching cues you can share on screen.</p>
 <div class="source-banner"><strong>New teaching outline · not a verified PowerPoint mapping</strong><p>Session 4’s academic-CV topic and the Session 3 homework bridge informed this hub. A Session 4 deck was not found. These numbers point to the 24 teaching cues built into this version. Reconcile them with your actual deck before referring to PPT slide numbers.</p></div>
 <div class="guide-actions"><button class="primary" data-slide="1">${icon('screen',18)} Open teaching cues</button><button class="secondary" data-action="outline">Download teaching outline</button></div>
 <section class="guide-card"><h2>Exercise-to-slide map</h2><div class="table-wrap"><table><thead><tr><th>Exercise</th><th>Teaching context</th><th>Exercise cue</th><th>Solo work</th></tr></thead><tbody>${exercises.map((e,i)=>`<tr><td><a href="#exercise-${i+1}">0${i+1} · ${e.short}</a></td><td>Hub slides ${[ '4–5','7–8','11–12','14–15','18–19','21–22'][i]}</td><td><button class="inline-link" data-slide="${e.slide}">Hub slide ${e.slide} ↗</button></td><td>${e.minutes} min</td></tr>`).join('')}</tbody></table></div></section>
 <div class="guide-grid"><section class="guide-card"><h2>Four-hour running order</h2><p class="muted small">Timings include teaching and debriefs. The individual-work timers are shorter than each block.</p><div class="agenda">${agenda.map(([time,title,slide])=>`<div><span>${time}</span><div><strong>${title}</strong><small>Hub slides ${slide}</small></div></div>`).join('')}</div></section><section class="guide-card"><h2>Keep everyone in the room.</h2><ol class="room-rules"><li>Announce the exercise number and open its teaching cue on your shared screen.</li><li>Give everyone quiet individual work time. Participants keep Meet and their own hub tab open.</li><li>Invite two or three volunteers for a short debrief. Passing is welcome; no peer pairing is required.</li><li>Discuss an anonymised example or a volunteered sentence. Obtain explicit consent before showing a CV or identifiable response.</li><li>Leave time to revise, mark ready and move together to the next exercise.</li></ol><div class="privacy-callout"><strong>No hidden classroom dashboard</strong><p>This view only changes what is displayed. It does not grant facilitator permissions or reveal anyone’s responses. Timers, progress and saving are local. On standard GitHub Pages, the exercises are publicly accessible. Responses remain in each participant’s own browser and are not uploaded to the facilitator.</p></div></section></div>
 <section class="guide-card"><h2>Facilitation notes</h2>${exercises.map((e,i)=>`<details class="facilitator-detail"><summary>0${i+1} · ${e.short}</summary><p>${e.cue}</p></details>`).join('')}</section>`;}

function refreshProgress(){
 $('[data-save]')&&($('[data-save]').textContent=savingText());
 $('.save-status')?.classList.toggle('warning',!storageOK);
 $('[data-total]')&&($('[data-total]').textContent=`${count()} of 6 ready`);
 $('progress')&&($('progress').value=count());
 $('.review-count')&&($('.review-count').textContent=`${count()}/6`);
 exercises.forEach((e,i)=>{const n=$(`[data-nav="${e.id}"]`);if(n){n.querySelector('small').textContent=status(e);n.querySelector('.step-number').innerHTML=state.ready[e.id]?icon('check',15):String(i+1).padStart(2,'0');n.classList.toggle('is-done',!!state.ready[e.id]);}});
 if(page==='exercise'){
  const e=exercises[active];if($('[data-fields]'))$('[data-fields]').textContent=`${filled(e)} / ${e.fields.length} prompts answered`;
  if($('.ready-message'))$('.ready-message').textContent=state.ready[e.id]?'✓ Ready for your final review':storageOK?'Your draft is saved as you write.':'Draft in this tab only. Export before leaving.';
  if($('[data-action="complete"]'))$('[data-action="complete"]').innerHTML=`${state.ready[e.id]?'Marked ready':'Mark exercise ready'} ${icon('check',18)}`;
 }
}
function bind(){
 document.querySelectorAll('[data-profile]').forEach(el=>el.addEventListener('input',()=>{state[el.dataset.profile]=el.value;save();}));
 document.querySelectorAll('[data-answer]').forEach(el=>el.addEventListener('input',()=>{
  const e=exercises[active];state.answers[e.id]??={};state.answers[e.id][el.dataset.answer]=el.value;state.ready[e.id]=false;state.checks[e.id]=e.check.map(()=>false);
  document.querySelectorAll('[data-check]').forEach(c=>c.checked=false);el.removeAttribute('aria-invalid');$('#validation').textContent='';save();
 }));
 document.querySelectorAll('[data-check]').forEach(el=>el.addEventListener('change',()=>{const e=exercises[active];state.checks[e.id]??=[];state.checks[e.id][+el.dataset.check]=el.checked;state.ready[e.id]=false;save();}));
 document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action)));
 document.querySelectorAll('[data-slide]').forEach(el=>el.addEventListener('click',()=>openSlide(+el.dataset.slide)));
}
function action(a){
 if(a==='resume'){let i=exercises.findIndex(e=>!state.ready[e.id]);go(i===-1?'review':`exercise-${i+1}`);}
 if(a==='complete'){
  const e=exercises[active],missing=e.fields.filter(([k])=>!answer(e,k).trim());
  if(missing.length){$('#validation').textContent=`Please answer ${missing.length} remaining prompt${missing.length===1?'':'s'} before marking ready.`;missing.forEach(([k])=>$(`#field-${k}`).setAttribute('aria-invalid','true'));$(`#field-${missing[0][0]}`).focus();return;}
  if(!e.check.every((_,i)=>state.checks[e.id]?.[i])){$('#validation').textContent='Please confirm both self-checks before marking ready.';$('[data-check]:not(:checked)').focus();return;}
  state.ready[e.id]=true;clocks[active].running=false;save();render();toast(`Exercise ${active+1} is ready. You can still edit it.`);
 }
 if(a==='timer'){let c=clocks[active];if(c.running){c.remaining=Math.max(0,Math.ceil((c.ends-Date.now())/1000));c.running=false;}else{if(c.remaining===0)c.remaining=exercises[active].minutes*60;c.ends=Date.now()+c.remaining*1000;c.running=true;}updateClock();}
 if(a==='reset-timer'){clocks[active]={remaining:exercises[active].minutes*60,running:false,ends:0};updateClock();}
 if(a==='export')exportPdf();
 if(a==='text-export')download(answerSheet(state,exercises).text,'Session_4_Exercises_and_Answers.txt','text/plain;charset=utf-8');
 if(a==='backup')download(JSON.stringify(state,null,2),'Session_4_CV_Backup.json','application/json');
 if(a==='outline')download(outlineText(),'Session_4_Teaching_Outline.md','text/markdown;charset=utf-8');
 if(a==='import')$('#import-file').click();
 if(a==='print'){toast('Choose Save as PDF in the print dialog. If it does not open, use Download answers (PDF).');window.print();}
 if(a==='clear')confirmDialog('Clear your local responses?','This removes your Session 4 answers, self-checks and name from this browser. Download a backup first if you want to keep them. This cannot delete any file you already downloaded.','Clear responses',()=>{
   try{localStorage.removeItem(KEY);}catch{toast('Could not clear browser storage. No responses were removed.');return;}
   state=fresh();corrupt=false;storageOK=true;save();go('overview');render();toast('Local Session 4 responses cleared. Downloaded backups are unchanged.');
 });
}
function exportPanel(text,title='Save your answer sheet'){
 const job=++exportJob,d=$('#dialog');
 if(d.open)d.close();
 d.className='export-dialog';
 d.innerHTML=`<div class="export-dialog-head"><div><div class="eyebrow">SESSION 04 · YOUR LOCAL COPY</div><h2>${esc(title)}</h2></div><button class="icon-button" id="close-export" aria-label="Close save panel">${icon('close')}</button></div><p id="export-message" role="status" aria-live="polite">Preparing your file…</p><div class="button-row" id="file-links"></div><p class="export-help">If a save does not start, try opening the file in a new tab. You can also copy the full text below into Word or Google Docs and save it as a PDF. Nothing is sent to the facilitator.</p><label for="export-text">Your complete answer sheet</label><textarea id="export-text" readonly rows="9" spellcheck="false"></textarea><div class="button-row"><button class="secondary" id="copy-export">Copy all text</button><button class="secondary" id="select-export">Select all text</button></div><p id="copy-message" role="status" aria-live="polite"></p>`;
 $('#export-text').value=text;
 $('#close-export').onclick=()=>{exportJob++;d.close();};
 $('#select-export').onclick=()=>{$('#export-text').focus();$('#export-text').select();$('#copy-message').textContent='Text selected. Press Ctrl+C (Windows) or ⌘C (Mac), then paste into your document.';};
 $('#copy-export').onclick=async()=>{
   const field=$('#export-text');field.focus();field.select();
   try{
     if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(field.value);
     else if(!document.execCommand('copy'))throw Error('Clipboard unavailable');
     if($('#copy-message'))$('#copy-message').textContent='Copied. Paste into Word, Google Docs or your chosen document.';
   }catch{if($('#copy-message'))$('#copy-message').textContent='Automatic copying is unavailable. The text is selected: press Ctrl+C (Windows) or ⌘C (Mac).';}
 };
 d.showModal();return job;
}
function visibleFileLinks(content,name,type,isPdf=false){
 const url=URL.createObjectURL(new Blob([content],{type}));
 const holder=$('#file-links');holder.innerHTML='';
 const save=document.createElement('a');save.href=url;save.download=name;save.className='primary';save.textContent=isPdf?'Save PDF':'Save file';save.id='save-export-file';
 const open=document.createElement('a');open.href=url;open.target='_blank';open.rel='noopener';open.className='secondary';open.textContent=isPdf?'Open PDF in new tab':'Open file in new tab';open.id='open-export-file';
 holder.append(save,open);
 save.addEventListener('click',()=>{$('#export-message').textContent='Save requested. Check your browser’s Downloads. If no file appears, use Open PDF / Open file or copy the text below.';});
 // Keep links alive for the full page session: browsers may defer a download or
 // open the PDF later. The browser releases them on navigation / tab close.
 $('#export-message').textContent=isPdf?'PDF ready. Select Save PDF to download it, or Open PDF to view and save it.':'File ready. Select Save file to download it.';
}
function download(content,name,type){exportPanel(content);visibleFileLinks(content,name,type);}
async function exportPdf(){
 const snapshot=JSON.parse(JSON.stringify(state));
 const sheet=answerSheet(snapshot,exercises),job=exportPanel(sheet.text,'Download exercises & answers');
 try{
   await document.fonts?.ready;
   const bytes=await createAnswerPdf(sheet.blocks);
   if(job!==exportJob||!$('#dialog').open||!$('#file-links'))return;
   visibleFileLinks(bytes,'Session_4_Exercises_and_Answers.pdf','application/pdf',true);
 }catch{
   if(job!==exportJob||!$('#dialog').open||!$('#file-links'))return;
   visibleFileLinks(sheet.text,'Session_4_Exercises_and_Answers.txt','text/plain;charset=utf-8');
   $('#export-message').textContent='The PDF could not be generated in this browser. Your answers are safe: save the text file or copy the complete sheet below.';
 }
}
function reviewText(){return `# PhD Application Lab — Session 4 CV Review\n\nParticipant: ${state.name||'Not specified'}\nResearch lane: ${state.lane||'Not specified'}\nExported: ${new Date().toLocaleString()}\nProgress: ${count()} / 6 exercises marked ready\n\nThese are working notes, not a finished CV. Nothing has been submitted automatically.\nHub slide references belong to the new built-in teaching outline, not a verified existing PowerPoint.\n\n`+exercises.map((e,i)=>`## ${i+1}. ${e.title}\n\nHub slide ${e.slide} | Status: ${status(e)}\n\n${e.fields.map(([k,l])=>`### ${l}\n\n${answer(e,k).trim()||'[Not answered yet]'}\n`).join('\n')}\nSelf-check:\n${e.check.map((s,j)=>`- [${state.checks[e.id]?.[j]?'x':' '}] ${s}`).join('\n')}`).join('\n\n---\n\n');}
function outlineText(){return '# Session 4 — Academic CV Studio\n\nNew proposed teaching outline. These are hub cue numbers, not a verified mapping to an existing PowerPoint.\n\n## Four-hour running order\n\n'+agenda.map(a=>a.join(' | ')).join('\n')+'\n\n## Exercise map\n\n'+exercises.map((e,i)=>`${i+1}. ${e.short}: Hub slide ${e.slide}, ${e.minutes} minutes of individual work.\nFacilitation: ${e.cue}`).join('\n\n')+'\n\n## Teaching cues\n\n'+slides.map((s,i)=>`### Hub slide ${i+1} — ${s[0]}\n\n${s.slice(1).join('\n\n')}`).join('\n\n');}
function confirmDialog(title,copy,label,callback){const d=$('#dialog');d.className='confirm-dialog';d.innerHTML=`<h2>${esc(title)}</h2><p>${esc(copy)}</p><div class="button-row"><button class="secondary" id="cancel-dialog">Cancel</button><button class="primary" id="confirm-dialog">${esc(label)}</button></div>`;d.showModal();$('#cancel-dialog').onclick=()=>d.close();$('#confirm-dialog').onclick=()=>{d.close();callback();};}
function openSlide(n){cueSlide=Math.min(24,Math.max(1,n));const s=slides[cueSlide-1],d=$('#dialog');d.className='slide-dialog';d.innerHTML=`<div class="slide-toolbar"><span>SESSION 04 · BUILT-IN TEACHING OUTLINE</span><button class="icon-button" id="close-slide" aria-label="Close teaching cue">${icon('close')}</button></div><div class="slide-content"><div class="eyebrow">HUB SLIDE ${String(cueSlide).padStart(2,'0')} / 24</div><h2>${s[0]}</h2><p>${s[1]}</p><div class="slide-takeaway">${s[2]}</div></div><div class="slide-bottom"><span>New outline · not existing PPT numbering</span><div class="button-row"><button class="secondary" id="previous-slide" ${cueSlide===1?'disabled':''}>${icon('back',16)} Previous</button><button class="primary" id="next-slide" ${cueSlide===24?'disabled':''}>Next ${icon('arrow',16)}</button></div></div>`;if(!d.open)d.showModal();$('#close-slide').onclick=()=>d.close();$('#previous-slide').onclick=()=>openSlide(cueSlide-1);$('#next-slide').onclick=()=>openSlide(cueSlide+1);}
function clockText(i){const n=clocks[i].remaining;return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function updateClock(){if(page!=='exercise')return;if($('[data-clock]'))$('[data-clock]').textContent=clockText(active);if($('[data-action="timer"]'))$('[data-action="timer"]').textContent=clocks[active].running?'Pause':clocks[active].remaining===0?'Restart timer':'Start timer';}
setInterval(()=>{clocks.forEach((c,i)=>{if(c.running){c.remaining=Math.max(0,Math.ceil((c.ends-Date.now())/1000));if(c.remaining===0){c.running=false;toast(`Exercise ${i+1}: time is up. Finish your thought; nothing was submitted.`);}}});updateClock();},250);
$('#import-file').addEventListener('change',async ev=>{const file=ev.target.files?.[0];ev.target.value='';if(!file)return;if(file.size>3000000){toast('Backup is too large. Choose a Session 4 JSON backup under 3 MB.');return;}let next;try{next=normalise(JSON.parse(await file.text()));}catch{toast('This file is not a valid Session 4 backup. Your work is unchanged.');return;}confirmDialog('Restore this backup?','This replaces the answers currently in this browser with the selected backup. Export your current work first if you want to keep both versions.','Restore backup',()=>{state=next;corrupt=false;save();render();toast('Session 4 backup restored.');});});
window.addEventListener('hashchange',()=>{route();window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});});
window.addEventListener('beforeunload',e=>{if(!storageOK&&exercises.some(x=>filled(x))){e.preventDefault();e.returnValue='';}});
document.addEventListener('keydown',e=>{if($('#dialog').open&&$('#dialog').classList.contains('slide-dialog')){if(e.key==='ArrowRight'){e.preventDefault();openSlide(cueSlide+1);}if(e.key==='ArrowLeft'){e.preventDefault();openSlide(cueSlide-1);}}});
route();
