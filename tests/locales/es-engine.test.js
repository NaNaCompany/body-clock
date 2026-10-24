import test from 'node:test';
import assert from 'node:assert/strict';
import {measurement,summarize} from '../../docs/es/engine.js';
test('Convierta milisegundos reales a segundos y calcule los errores tempranos y tardíos como errores absolutos',()=>{assert.equal(measurement(100,10200).elapsed,10.1);assert.ok(Math.abs(measurement(100,10000).error-.1)<1e-9);});
test('El error absoluto y la precisión promediados tres veces no son negativos',()=>{const result=summarize([measurement(0,9000),measurement(0,11000),measurement(0,10000)]);assert.equal(result.error,2/3);assert.equal(summarize(Array(3).fill(measurement(0,40000))).accuracy,0);});
test('Tiempo retrógrado y rechazo de resultados incompletos.',()=>{assert.throws(()=>measurement(10,0));assert.throws(()=>summarize([]));});
