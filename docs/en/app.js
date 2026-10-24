import {measurement,summarize} from './engine.js';
import {$,status,showResult} from './common.js';
let rounds=[],running=false,start=0,lock=0,limit;
function render(){
 $('#play').innerHTML=`<div class="stage"><div class="rounds">${[0,1,2].map(i=>`<span class="dot ${i<rounds.length?'done':''}"></span>`).join('')}</div><div class="dial"><span class="dial-text">10 seconds</span></div><p class="muted">${rounds.length?'Take a breath, then try another ten seconds.':'There is no running timer.<br>Trust your own sense of time.'}</p><button id="clock-action" class="primary">${rounds.length?`Start round ${rounds.length+1}`:'Test my 10-second timing'}</button><p class="micro">After starting, press the button once more to stop.</p></div>`;
 $('#progress').textContent=`ROUND ${rounds.length+1} / 3`;$('#clock-action').onclick=action;
}
function action(){const now=performance.now();if(now<lock)return;lock=now+250;
 if(!running){running=true;start=now;$('#clock-action').textContent='Ten seconds! Stop now';$('.dial').classList.add('running');$('.dial-text').textContent='Trust your timing';status('During measurement · Do not move to another tab.');limit=setTimeout(()=>invalidate('This measurement timed out. Please retry this round.'),60000);}
 else{running=false;clearTimeout(limit);const r=measurement(start,now);rounds.push(r);if(rounds.length===3)finish();else{render();status(`Round ${rounds.length}: ${r.elapsed.toFixed(2)} s · error ${r.error.toFixed(2)} s`);}}
}
function invalidate(message){if(!running)return;running=false;clearTimeout(limit);render();status(message);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate('You left the screen, so this measurement was discarded. Retry this round.');});
window.addEventListener('pagehide',()=>invalidate('Measurement reset after leaving the screen.'));
function finish(){const r=summarize(rounds);showResult(`<div class="stage"><p class="eyebrow">YOUR INNER CLOCK</p><div class="result-art"><i></i><i></i><i></i></div><div class="big">${r.error.toFixed(2)}<span style="font-size:22px"> s</span></div><p class="muted">Average absolute error of three runs</p><h2 class="result-title">${r.title}</h2>${rounds.map((x,i)=>`<div class="metric-row"><span>Round ${i+1}</span><strong>${x.elapsed.toFixed(2)} s / error ${x.error.toFixed(2)} s</strong></div>`).join('')}<div class="metric-row"><span>game accuracy</span><strong>${r.accuracy.toFixed(1)}%</strong></div><p class="micro">Accuracy = max(0, 100 − mean error in seconds × 10)</p></div>`,{name:'The Inner Clock',value:`Error ${r.error.toFixed(2)} s`,subtitle:r.title,color:'#267861',slug:'inner-clock',share:`Average error of my body clock ${r.error.toFixed(2)} s · ${r.title}. Can you stop more accurately than me in 10 seconds without a clock?`});}
$('#retry').onclick=()=>{clearTimeout(limit);rounds=[];running=false;lock=0;$('#result').classList.add('hidden');$('#result-actions').classList.add('hidden');$('#play').classList.remove('hidden');status('Start three new measurements.');render();};render();
