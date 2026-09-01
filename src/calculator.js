#!/usr/bin/env node
'use strict';

/*
 * Calculator supporting the core arithmetic operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 * - modulo (%)
 * - exponentiation (power, ^)
 * - square root (sqrt)
 */

const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

function ensureNumber(value, label) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid finite number.`);
  }

  return parsed;
}

function add(a, b) {
  return ensureNumber(a, 'First operand') + ensureNumber(b, 'Second operand');
}

function subtract(a, b) {
  return ensureNumber(a, 'First operand') - ensureNumber(b, 'Second operand');
}

function multiply(a, b) {
  return ensureNumber(a, 'First operand') * ensureNumber(b, 'Second operand');
}

function divide(a, b) {
  const left = ensureNumber(a, 'First operand');
  const right = ensureNumber(b, 'Second operand');

  if (right === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return left / right;
}

function modulo(a, b) {
  const left = ensureNumber(a, 'First operand');
  const right = ensureNumber(b, 'Second operand');

  if (right === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return left % right;
}

function power(base, exponent) {
  const left = ensureNumber(base, 'Base');
  const right = ensureNumber(exponent, 'Exponent');
  return left ** right;
}

function squareRoot(n) {
  const value = ensureNumber(n, 'Number');

  if (value < 0) {
    throw new Error('Square root of a negative number is not defined.');
  }

  return Math.sqrt(value);
}

function calculate(firstOperand, operator, secondOperand) {
  const left = ensureNumber(firstOperand, 'First operand');
  const symbol = String(operator || '').trim().toLowerCase();

  if (['sqrt', 'square-root', 'squareroot', 'square root'].includes(symbol)) {
    return squareRoot(left);
  }

  const right = ensureNumber(secondOperand, 'Second operand');

  switch (symbol) {
    case '+':
    case 'add':
    case 'addition':
      return left + right;
    case '-':
    case 'subtract':
    case 'subtraction':
      return left - right;
    case '*':
    case 'x':
    case 'multiply':
    case 'multiplication':
      return left * right;
    case '/':
    case 'divide':
    case 'division':
      if (right === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return left / right;
    case '%':
    case 'mod':
    case 'modulo':
      if (right === 0) {
        throw new Error('Modulo by zero is not allowed.');
      }
      return left % right;
    case '**':
    case '^':
    case 'power':
    case 'exponent':
      return left ** right;
    default:
      throw new Error(
        `Unsupported operation: "${operator}". Supported operations are +, -, *, /, %, ^, sqrt, add, subtract, multiply, divide, modulo, power, and square root.`
      );
  }
}

async function promptForCalculation() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const firstOperand = await rl.question('Enter the first number: ');
    const operator = await rl.question('Enter the operation (+, -, *, /, %, ^, sqrt): ');
    const secondOperand = await rl.question('Enter the second number (leave blank for single-operand operations like sqrt): ');

    const result = calculate(firstOperand, operator, secondOperand || undefined);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

async function runCli() {
  const [, , firstOperand, rawOperator, secondOperand] = process.argv;

  if (process.argv.length === 2) {
    await promptForCalculation();
    return;
  }

  const symbol = String(rawOperator || '').trim().toLowerCase();
  const isSingleOperandOperation = ['sqrt', 'square-root', 'squareroot', 'square root'].includes(symbol);

  if (process.argv.length < 4 || (process.argv.length < 5 && !isSingleOperandOperation)) {
    console.log('Usage: node src/calculator.js <number> <operator> [number]');
    console.log('Examples:');
    console.log('  node src/calculator.js 10 + 5');
    console.log('  node src/calculator.js 81 sqrt');
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(firstOperand, rawOperator, isSingleOperandOperation ? undefined : secondOperand);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
