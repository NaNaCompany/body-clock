import {measurement,summarize} from './engine.js';
import {$,status,showResult} from './common.js';
let rounds=[],running=false,start=0,lock=0,limit;
function render(){
 $('#play').innerHTML=`<div class="stage"><div class="rounds">${[0,1,2].map(i=>`<span class="dot ${i<rounds.length?'done':''}"></span>`).join('')}</div><div class="dial"><span class="dial-text">10 seconds</span></div><p class="muted">${rounds.length?'잠깐 숨을 고르고, 다음 10초를 느껴 보세요.':'화면의 숫자는 움직이지 않아요.<br>오직 당신의 시간 감각으로.'}</p><button id="clock-action" class="primary">${rounds.length?`${rounds.length+1}번째 측정 시작`:'내 10초 감각 시험하기'}</button><p class="micro">시작 후 버튼을 한 번 더 누르면 멈춥니다.</p></div>`;
 $('#progress').textContent=`ROUND ${rounds.length+1} / 3`;$('#clock-action').onclick=action;
}
function action(){const now=performance.now();if(now<lock)return;lock=now+250;
 if(!running){running=true;start=now;$('#clock-action').textContent='지금이 10초! 멈추기';$('.dial').classList.add('running');$('.dial-text').textContent='느껴 보세요';status('측정 중 · 다른 탭으로 이동하지 마세요.');limit=setTimeout(()=>invalidate('측정이 너무 길어져 이번 판을 다시 시작합니다.'),60000);}
 else{running=false;clearTimeout(limit);const r=measurement(start,now);rounds.push(r);if(rounds.length===3)finish();else{render();status(`${rounds.length}번째 기록 ${r.elapsed.toFixed(2)}초 · 오차 ${r.error.toFixed(2)}초`);}}
}
function invalidate(message){if(!running)return;running=false;clearTimeout(limit);render();status(message);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate('화면을 벗어나 이번 측정은 무효입니다. 같은 판부터 다시 시작해 주세요.');});
window.addEventListener('pagehide',()=>invalidate('화면을 벗어나 측정을 초기화했습니다.'));
function finish(){const r=summarize(rounds);showResult(`<div class="stage"><p class="eyebrow">YOUR INNER CLOCK</p><div class="result-art"><i></i><i></i><i></i></div><div class="big">${r.error.toFixed(2)}<span style="font-size:22px">초</span></div><p class="muted">세 번의 평균 절대 오차</p><h2 class="result-title">${r.title}</h2>${rounds.map((x,i)=>`<div class="metric-row"><span>${i+1}번째 측정</span><strong>${x.elapsed.toFixed(2)}초 / 오차 ${x.error.toFixed(2)}초</strong></div>`).join('')}<div class="metric-row"><span>게임 정확도</span><strong>${r.accuracy.toFixed(1)}%</strong></div><p class="micro">정확도 = max(0, 100 − 평균 오차(초) × 10)</p></div>`,{name:'10초 몸속 시계',value:`오차 ${r.error.toFixed(2)}초`,subtitle:r.title,color:'#267861',slug:'inner-clock',share:`내 몸속 시계 평균 오차 ${r.error.toFixed(2)}초 · ${r.title}. 시계 없이 10초, 나보다 정확히 멈출 수 있을까?`});}
$('#retry').onclick=()=>{clearTimeout(limit);rounds=[];running=false;lock=0;$('#result').classList.add('hidden');$('#result-actions').classList.add('hidden');$('#play').classList.remove('hidden');status('새로운 세 번의 측정을 시작합니다.');render();};render();
