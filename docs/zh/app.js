import {measurement,summarize} from './engine.js';
import {$,status,showResult} from './common.js';
let rounds=[],running=false,start=0,lock=0,limit;
function render(){
 $('#play').innerHTML=`<div class="stage"><div class="rounds">${[0,1,2].map(i=>`<span class="dot ${i<rounds.length?'done':''}"></span>`).join('')}</div><div class="dial"><span class="dial-text">10 seconds</span></div><p class="muted">${rounds.length?'缓口气，再感受下一个十秒.':'屏幕上不会显示计时.<br>只凭你的时间感.'}</p><button id="clock-action" class="primary">${rounds.length?`开始第 ${rounds.length+1} 次测量`:'测试我的十秒感'}</button><p class="micro">启动后，再按一次按钮即可停止。.</p></div>`;
 $('#progress').textContent=`ROUND ${rounds.length+1} / 3`;$('#clock-action').onclick=action;
}
function action(){const now=performance.now();if(now<lock)return;lock=now+250;
 if(!running){running=true;start=now;$('#clock-action').textContent='十秒到了！停止';$('.dial').classList.add('running');$('.dial-text').textContent='感受时间';status('测量期间 · 不要移动到另一个选项卡.');limit=setTimeout(()=>invalidate('测量超时，请重新进行本次测量。'),60000);}
 else{running=false;clearTimeout(limit);const r=measurement(start,now);rounds.push(r);if(rounds.length===3)finish();else{render();status(`第 ${rounds.length} 次：${r.elapsed.toFixed(2)} 秒 · 误差 ${r.error.toFixed(2)} 秒`);}}
}
function invalidate(message){if(!running)return;running=false;clearTimeout(limit);render();status(message);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)invalidate('你离开了页面，本次测量作废。请重新开始本次测量。');});
window.addEventListener('pagehide',()=>invalidate('离开屏幕后重置测量.'));
function finish(){const r=summarize(rounds);showResult(`<div class="stage"><p class="eyebrow">YOUR INNER CLOCK</p><div class="result-art"><i></i><i></i><i></i></div><div class="big">${r.error.toFixed(2)}<span style="font-size:22px">秒</span></div><p class="muted">三次运行的平均绝对误差</p><h2 class="result-title">${r.title}</h2>${rounds.map((x,i)=>`<div class="metric-row"><span>第 ${i+1} 次测量</span><strong>${x.elapsed.toFixed(2)} 秒 / 误差 ${x.error.toFixed(2)} 秒</strong></div>`).join('')}<div class="metric-row"><span>游戏准确度</span><strong>${r.accuracy.toFixed(1)}%</strong></div><p class="micro">准确度 = max(0, 100 − 平均误差秒数 × 10)</p></div>`,{name:'身体里的十秒钟',value:`误差 ${r.error.toFixed(2)}秒`,subtitle:r.title,color:'#267861',slug:'inner-clock',share:`我的生物钟的平均误差 ${r.error.toFixed(2)}秒 · ${r.title}. 没有时钟，你能比我更准确地在10秒内停下来吗？`});}
$('#retry').onclick=()=>{clearTimeout(limit);rounds=[];running=false;lock=0;$('#result').classList.add('hidden');$('#result-actions').classList.add('hidden');$('#play').classList.remove('hidden');status('开始三个新的测量.');render();};render();
