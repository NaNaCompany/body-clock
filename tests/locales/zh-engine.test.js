import test from 'node:test';
import assert from 'node:assert/strict';
import {measurement,summarize} from '../../docs/zh/engine.js';
test('将实际毫秒转换为秒，并将提前和延迟计算为绝对误差',()=>{assert.equal(measurement(100,10200).elapsed,10.1);assert.ok(Math.abs(measurement(100,10000).error-.1)<1e-9);});
test('三次平均的绝对误差和准确度均为非负值',()=>{const result=summarize([measurement(0,9000),measurement(0,11000),measurement(0,10000)]);assert.equal(result.error,2/3);assert.equal(summarize(Array(3).fill(measurement(0,40000))).accuracy,0);});
test('逆行时间和拒绝不完整的结果',()=>{assert.throws(()=>measurement(10,0));assert.throws(()=>summarize([]));});
