const test = require('node:test');
const assert = require('node:assert/strict');

const { add, subtract, multiply, divide, calculate } = require('../calculator.js');

test('addition works for basic examples and edge cases', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(10, 0), 10);
  assert.equal(add(-2, 3), 1);
  assert.equal(add(0.5, 1.25), 1.75);
});

test('subtraction works for basic examples and edge cases', () => {
  assert.equal(subtract(10, 4), 6);
  assert.equal(subtract(3, 10), -7);
  assert.equal(subtract(-2, -3), 1);
  assert.equal(subtract(0, 0), 0);
});

test('multiplication works for basic examples and edge cases', () => {
  assert.equal(multiply(45, 2), 90);
  assert.equal(multiply(4, 5), 20);
  assert.equal(multiply(-3, 7), -21);
  assert.equal(multiply(0, 99), 0);
});

test('division works for basic examples and edge cases', () => {
  assert.equal(divide(20, 5), 4);
  assert.equal(divide(9, 2), 4.5);
  assert.equal(divide(-8, 2), -4);
  assert.equal(divide(7, 0.5), 14);
});

test('divide throws when dividing by zero', () => {
  assert.throws(() => divide(10, 0), /Division by zero is not allowed\./);
  assert.throws(() => divide(0, 0), /Division by zero is not allowed\./);
});

test('calculate supports the operations shown in the sample image', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
});

test('calculate supports the extended operations and rejects invalid input', () => {
  assert.equal(calculate(8, 'add', 2), 10);
  assert.equal(calculate(8, 'subtract', 2), 6);
  assert.equal(calculate(8, 'multiply', 2), 16);
  assert.equal(calculate(8, 'divide', 2), 4);
  assert.equal(calculate(10, '%', 3), 1);
  assert.equal(calculate(2, '^', 5), 32);
  assert.equal(calculate(81, 'sqrt'), 9);
  assert.equal(calculate(5, 'modulo', 2), 1);
  assert.equal(calculate(2, 'power', 3), 8);
  assert.equal(calculate(16, 'square root'), 4);
  assert.throws(() => calculate(5, '/', 0), /Division by zero is not allowed\./);
  assert.throws(() => calculate(5, '%', 0), /Modulo by zero is not allowed\./);
  assert.throws(() => calculate(-4, 'sqrt'), /Square root of a negative number is not defined\./);
  assert.throws(() => calculate(5, '$', 2), /Unsupported operation/);
});
