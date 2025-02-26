// BE SURE TO IMPORT YOUR STACK CLASS
import { Stack } from "./2-stack";
// ==============================
// 1️⃣ Reverse a String Using a Stack
// ==============================
// Write a function that takes a string as input and returns the reversed string using a stack.
// You may only use stack operations (`push`, `pop`, `isEmpty`).

function reverseString(string: string): string {
  const stack = new Stack();
  let reversed: string[] = [];
  for (let letter of string) {
    stack.push(letter);
  }
  while (!stack.isEmpty()) {
    reversed.push(stack.pop());
  }
  return reversed.join("");
}

// Example Test Cases:
// console.log(reverseString("hello")); // "olleh"
// console.log(reverseString("world")); // "dlrow"
// console.log(reverseString("")); // ""
// console.log(reverseString("abcd")); // "dcba"

// ==============================
// 2️⃣ Check for Balanced Parentheses
// ==============================
// Given a string containing only the characters `()`, `{}`, and `[]`,
// write a function to determine if the string is valid.
// A string is valid if brackets are closed in the correct order. Use a stack to track open brackets.

function isValidParentheses(string: string): boolean {
  const stack = new Stack();
  for (const symbol of string) {
    switch (symbol) {
      case "}":
        stack.peek() === "{" ? stack.pop() : false;
        break;
      case "]":
        stack.peek() === "[" ? stack.pop() : false;
        break;
      case ")":
        stack.peek() === "(" ? stack.pop() : false;
        break;
      default:
        stack.push(symbol);
    }
  }
  return stack.isEmpty() ? true : false;
}

// Example Test Cases:
// console.log(
//   isValidParentheses("({[]})"), // true
//   isValidParentheses("({[)]}"), // false
//   isValidParentheses("()"), // true
//   isValidParentheses("{[()]}"), // true
//   isValidParentheses("(((") // false
// );

// ==============================
// 3️⃣ Evaluate a Postfix Expression
// ==============================
// Write a function that evaluates a mathematical expression in **postfix notation** (Reverse Polish Notation).
// The function should use a stack to process numbers and operators.
// Assume the input is a space-separated string of numbers and `+`, `-`, `*`, or `/` operators.

function evaluatePostfix(sequence: string): number {
  const stack = new Stack();
  const expressions = sequence.split(" ");
  for (const expression of expressions) {
    let number = parseInt(expression);
    if (isNaN(number)) {
      let value1 = stack.pop();
      let value2 = stack.pop();
      switch (expression) {
        case "+":
          stack.push(value2 + value1);
          break;
        case "-":
          stack.push(value2 - value1);
          break;
        case "*":
          stack.push(value2 * value1);
          break;
        case "/":
          stack.push(value2 / value1);
          break;
      }
    } else {
      stack.push(number);
    }
  }
  return stack.peek();
}
// Example Test Cases:
// console.log(
//   evaluatePostfix("3 4 +"), // 7
//   evaluatePostfix("5 1 2 + 4 * + 3 -"), // 14
//   evaluatePostfix("10 2 8 * + 3 -"), // 23
//   evaluatePostfix("6 2 /"), // 3
//   evaluatePostfix("4 5 * 2 /") // 10
// );

// ==============================
// 4️⃣ Next Greater Element
// ==============================
// Given an array of integers, find the **next greater element** for each element.
// The next greater element of an element **x** is the first element to the right that is greater than **x**.
// If none exists, return `-1` for that element. Use a stack for efficiency.

function nextGreaterElement(numbers: number[]): number[] {
  const stack = new Stack();
  const greatest = new Array(numbers.length).fill(-1);

  for (let i = numbers.length - 1; i >= 0; i--) {
    while (!stack.isEmpty() && stack.peek() <= numbers[i]) {
      stack.pop();
    }
    if (!stack.isEmpty()) {
      greatest[i] = stack.peek();
    }
    stack.push(numbers[i]);
  }
  return greatest;
}

// Example Test Cases:
// console.log(
//   nextGreaterElement([4, 5, 2, 10, 8]), // [5, 10, 10, -1, -1]
//   nextGreaterElement([3, 2, 1]), // [-1, -1, -1]
//   nextGreaterElement([1, 3, 2, 4])
// ); // [3, 4, 4, -1]

// ==============================
// 5️⃣ Daily Temperatures
// ==============================
// Given an array `temperatures` where `temperatures[i]` is the temperature on day `i`,
// return an array **answer** where `answer[i]` is the number of days you have to wait after the `i-th` day
// to get a warmer temperature. If there is no future day with a warmer temperature, return `0`.

function dailyTemperatures(temperatures: number[]): number[] {
  const stack = new Stack();
  const popped = new Stack();
  let days = new Array(temperatures.length).fill(0);

  for (let i = temperatures.length - 1; i >= 0; i--) {
    //Goes down temperature stack and will keep count of how far it needs to go to get to a number that is higher.
    while (!stack.isEmpty()) {
      if (temperatures[i] > stack.peek()) {
        popped.push(stack.pop());
      } else {
        break;
      }
    }
    //Makes day zero if there is no higher number
    if (stack.isEmpty()) {
      days[i] = 0;
    } else {
      //Makes day by how many numbers it had to pass to get to a higher number
      days[i] = popped.size() + 1;
    }
    //Moves all the popped numbers back into the main temperature stack while adding the new one.
    while (!popped.isEmpty()) {
      stack.push(popped.pop());
    }
    stack.push(temperatures[i]);
  }
  return days;
}

// Example Test Cases:
console.log(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), // [1, 1, 4, 2, 1, 1, 0, 0]
  dailyTemperatures([30, 40, 50, 60]), // [1, 1, 1, 0]
  dailyTemperatures([30, 20, 10])
); // [0, 0, 0]
