
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// Data for testing
const fullInput = ['0.1', '+', '0.2', '*', '4', '+', 7, '-', 90, '/', 333333];


// TO DO When user hits '=', then what is in fullInput gets sent to getResult
function getResult(fullInput) {
  // TERMINATION
  if (fullInput.length < 1) return 0;
  // BASE
  if (fullInput.length === 1) return fullInput[0];
  // RECURSION

  // Helper function for finding index of operator
  function isDivOrMul(data) {
    if (data === '/' || data === '*') {
      return true;
    }
    return false;
  }

  // Helper function for finding index of operator
  function isSubOrAdd(data) {
    if (data === '-' || data === '+') {
      return true;
    }
    return false;
  }

  // Will store index of operator
  let operatorPos;

  // Finds index of operator according to order of operations
  if (fullInput.findIndex(isDivOrMul) !== -1) {
    // gets index of operator
    operatorPos = fullInput.findIndex(isDivOrMul);
  } else if (fullInput.findIndex(isSubOrAdd) !== -1) {
    // gets index of operator
    operatorPos = fullInput.findIndex(isSubOrAdd);
  }

  // Gets operator
  const operator = fullInput[operatorPos];

  // Gets operands
  const leftOperand = fullInput[operatorPos - 1];
  const rightOperand = fullInput[operatorPos + 1];

  // Does the math
  function doMath(leftOperand, rightOperand) {
    switch (operator) {
      case '/':
        return leftOperand / rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '+':
        return leftOperand + rightOperand;
      default:
        return 0;
    }
  }

  // Calls doMath, first converting any string values into floats
  let result = doMath(parseFloat(leftOperand), parseFloat(rightOperand));

  // Fixes the decimal problem to the nth place
  result = result.toFixed(10);

  // Removes trailing zeroes
  result = result.replace(/0*$/, '');

  // TO DO Will the '.' need removed in some instances? When the result is a whole number.

  // Copies array
  const newFullInput = [...fullInput];
  // Updates array with old operands removed, result inserted
  newFullInput.splice(operatorPos - 1, 3, result);

  // Returns an array to getResult with what is left to calculate
  return getResult(newFullInput);
}

console.log(getResult(fullInput));

export default getResult;
