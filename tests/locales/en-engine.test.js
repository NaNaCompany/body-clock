import test from 'node:test';
import assert from 'node:assert/strict';
import {measurement,summarize} from '../../docs/en/engine.js';
test('Convert actual milliseconds to seconds and calculate both early and late as absolute errors',()=>{assert.equal(measurement(100,10200).elapsed,10.1);assert.ok(Math.abs(measurement(100,10000).error-.1)<1e-9);});
test('Absolute error and accuracy averaged over three times are non-negative',()=>{const result=summarize([measurement(0,9000),measurement(0,11000),measurement(0,10000)]);assert.equal(result.error,2/3);assert.equal(summarize(Array(3).fill(measurement(0,40000))).accuracy,0);});
test('Retrograde time and rejection of incomplete results',()=>{assert.throws(()=>measurement(10,0));assert.throws(()=>summarize([]));});
