import test from 'node:test';
import assert from 'node:assert/strict';
import {measurement,summarize} from '../../docs/ko/engine.js';
test('실측 밀리초를 초로 환산하고 빠름·늦음 모두 절대 오차로 계산',()=>{assert.equal(measurement(100,10200).elapsed,10.1);assert.ok(Math.abs(measurement(100,10000).error-.1)<1e-9);});
test('세 번 평균 절대 오차와 정확도는 음수 없음',()=>{const result=summarize([measurement(0,9000),measurement(0,11000),measurement(0,10000)]);assert.equal(result.error,2/3);assert.equal(summarize(Array(3).fill(measurement(0,40000))).accuracy,0);});
test('역행 시간과 미완료 결과 거부',()=>{assert.throws(()=>measurement(10,0));assert.throws(()=>summarize([]));});
