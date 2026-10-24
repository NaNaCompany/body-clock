import {measurement,summarize} from './engine.js';
import {$,status,showResult} from './common.js';
let rounds=[],running=false,start=0,lock=0,limit;
function render(){
 $('#play').innerHTML=`<div class="stage"><div class="rounds">${[0,1,2].map(i=>`<span class="dot ${i<rounds.length?'done':''}"></span>`).join('')}</div><div class="dial"><span class="dial-text">10 seconds</span></div><p class="muted">${rounds.length?'Respira y vuelve a intentar contar diez segundos.':'No hay un contador en marcha.<br>Confía en tu sentido del tiempo.'}</p><button id="clock-action" class="primary">${rounds.length?`Empezar ronda ${rounds.length+1}`:'Probar mi sentido de diez segundos'}</button><p class="micro">Después de comenzar, presione el botón una vez más para detener.</p></div>`;
 $('#progress').textContent=`ROUND ${rounds.length+1} / 3`;$('#clock-action').onclick=action;
}
function action(){const now=performance.now();if(now<lock)return;lock=now+250;
 if(!running){running=true;start=now;$('#clock-action').textContent='¡Diez segundos! Parar';$('.dial').classList.add('running');$('.dial-text').textContent='Siente el tiempo';status('Durante la medición · No pasar a otra pestaña.');limit=setTimeout(()=>invalidate('Se agotó el tiempo. Repite esta ronda.'),60000);}
 else{running=false;clearTimeout(limit);const r=measurement(start,now);rounds.push(r);if(rounds.length===3)finish();else{render();status(`Ronda ${rounds.length}: ${r.elapsed.toFixed(2)} s · error ${r.error.toFixed(2)} s`);}}
}
function invalidate(message){if(!running)return;running=false;clearTimeout(limit);render();status(message);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate('Al salir de la pantalla se anuló esta medición. Repite la ronda.');});
window.addEventListener('pagehide',()=>invalidate('Restablecimiento de la medición después de salir de la pantalla.'));
function finish(){const r=summarize(rounds);showResult(`<div class="stage"><p class="eyebrow">YOUR INNER CLOCK</p><div class="result-art"><i></i><i></i><i></i></div><div class="big">${r.error.toFixed(2)}<span style="font-size:22px"> s</span></div><p class="muted">Error absoluto promedio de tres ejecuciones</p><h2 class="result-title">${r.title}</h2>${rounds.map((x,i)=>`<div class="metric-row"><span>Ronda ${i+1}</span><strong>${x.elapsed.toFixed(2)} s / error ${x.error.toFixed(2)} s</strong></div>`).join('')}<div class="metric-row"><span>precisión del juego</span><strong>${r.accuracy.toFixed(1)}%</strong></div><p class="micro">Precisión = max(0, 100 − error medio en segundos × 10)</p></div>`,{name:'Tu reloj interior',value:`Error ${r.error.toFixed(2)} s`,subtitle:r.title,color:'#267861',slug:'inner-clock',share:`Error promedio de mi reloj biológico ${r.error.toFixed(2)} s · ${r.title}. ¿Puedes parar con mayor precisión que yo en 10 segundos sin reloj?`});}
$('#retry').onclick=()=>{clearTimeout(limit);rounds=[];running=false;lock=0;$('#result').classList.add('hidden');$('#result-actions').classList.add('hidden');$('#play').classList.remove('hidden');status('Iniciar tres nuevas mediciones.');render();};render();
