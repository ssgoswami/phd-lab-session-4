import { PDFDocument } from './vendor/pdf-lib.js';

// Build both formats from the same snapshot so a save never changes responses.
export function answerSheet(state, exercises, now = new Date()) {
  const blocks = [
    {type:'title',text:'Session 4 · Academic CV studio'},
    {type:'body',text:`Participant: ${state.name || 'Not specified'}\nResearch lane: ${state.lane || 'Not specified'}`},
    {type:'meta',text:`Exported: ${now.toLocaleString()}\n${exercises.filter(e=>state.ready[e.id]).length} of 6 exercises marked ready. Drafts and unanswered prompts are included.`},
    {type:'meta',text:'Working exercise responses, not a finished CV. Nothing has been submitted automatically. Hub slide numbers refer to the new teaching outline, not a verified PowerPoint.'}
  ];
  exercises.forEach((e,i)=>{
    blocks.push({type:'exercise',text:`${i+1}. ${e.title}`,newPage:i>0});
    blocks.push({type:'meta',text:`Hub slide ${e.slide} · ${state.ready[e.id]?'Ready':'Draft'}`});
    blocks.push({type:'body',text:e.steps.map((s,j)=>`${j+1}. ${s}`).join('\n')});
    e.fields.forEach(([key,label])=>{
      blocks.push({type:'prompt',text:label});
      blocks.push({type:'body',text:state.answers[e.id]?.[key]?.trim() || '[Not answered yet]'});
    });
    blocks.push({type:'prompt',text:'Self-check'});
    blocks.push({type:'meta',text:e.check.map((s,j)=>`${state.checks[e.id]?.[j]?'[Confirmed]':'[Not confirmed]'} ${s}`).join('\n')});
  });
  return {blocks,text:blocks.map(b=>b.text).join('\n\n')};
}

export function wrapText(ctx, text, maxWidth) {
  const lines=[];
  // Preserve explicit line breaks and all non-whitespace characters, including
  // long identifiers and Unicode sequences. The full original stays in .txt.
  for(const paragraph of String(text).replace(/\r\n?/g,'\n').split('\n')) {
    if(!paragraph){lines.push('');continue;}
    let line='';
    const tokens=paragraph.match(/\S+|\s+/gu)||[];
    for(const token of tokens){
      if(ctx.measureText(line+token).width<=maxWidth){line+=token;continue;}
      if(line.trim()){lines.push(line.trimEnd());line='';}
      if(!token.trim())continue;
      if(ctx.measureText(token).width<=maxWidth){line=token;continue;}
      const units=typeof Intl.Segmenter==='function'
        ? [...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(token)].map(x=>x.segment)
        : Array.from(token);
      for(const unit of units){
        if(line&&ctx.measureText(line+unit).width>maxWidth){lines.push(line);line='';}
        line+=unit;
      }
    }
    if(line.trim())lines.push(line.trimEnd());
  }
  return lines;
}

export async function createAnswerPdf(blocks, options={}) {
  const makeCanvas=options.createCanvas||((width,height)=>{const c=document.createElement('canvas');c.width=width;c.height=height;return c;});
  const yieldTask=options.yieldTask||(()=>new Promise(resolve=>setTimeout(resolve,0)));
  const pdf=await PDFDocument.create();
  pdf.setTitle('PhD Application Lab — Session 4 answers');
  pdf.setSubject('Individual academic CV exercises and responses');
  pdf.setCreator('PhD Application Lab');
  const width=1240,height=1754,margin=86,bottom=height-106;
  const canvas=makeCanvas(width,height),ctx=canvas.getContext('2d');
  if(!ctx)throw new Error('This browser cannot render PDF pages.');
  let y=0,pageNumber=0;
  function start(){
    pageNumber++;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);
    ctx.textBaseline='top';ctx.font='600 20px sans-serif';ctx.fillStyle='#54735a';
    ctx.fillText('PhD APPLICATION LAB  /  SESSION 04',margin,44);
    ctx.fillStyle='#dce5da';ctx.fillRect(margin,82,width-margin*2,2);y=112;
  }
  async function finish(){
    ctx.font='18px sans-serif';ctx.fillStyle='#637360';
    ctx.fillText(`Personal exercise responses · Page ${pageNumber}`,margin,height-64);
    const image=await pdf.embedJpg(canvas.toDataURL('image/jpeg',0.94));
    pdf.addPage([595.28,841.89]).drawImage(image,{x:0,y:0,width:595.28,height:841.89});
    await yieldTask();
  }
  start();
  for(let i=0;i<blocks.length;i++){
    const b=blocks[i];
    if(b.newPage&&y>112){await finish();start();}
    const style={title:[40,54,600,'#183e36',22],exercise:[34,47,600,'#183e36',18],prompt:[26,38,600,'#31533d',8],body:[25,38,400,'#24332a',18],meta:[21,32,400,'#596a57',18]}[b.type]||[25,38,400,'#24332a',18];
    const [size,leading,weight,color,gap]=style;
    const font=`${weight} ${size}px sans-serif`;
    ctx.font=font;
    const lines=wrapText(ctx,b.text,width-margin*2);
    // Keep headings with the first two following answer lines where possible.
    if(['title','exercise','prompt'].includes(b.type)&&y+Math.min(lines.length,2)*leading+76>bottom){await finish();start();}
    for(const line of lines){
      if(y+leading>bottom){await finish();start();}
      ctx.font=font;ctx.fillStyle=color;ctx.fillText(line,margin,y);
      options.trace?.({block:i,line,page:pageNumber,y,leading,bottom});y+=leading;
    }
    y+=gap;
  }
  await finish();
  return pdf.save();
}
