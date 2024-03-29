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
    // Gets index of operator
    operatorPos = fullInput.findIndex(isDivOrMul);
  } else if (fullInput.findIndex(isSubOrAdd) !== -1) {
    // Gets index of operator
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
  console.log(result);
  // Removes trailing zeroes
  result = result.replace(/0*$/, ''); // Because of the toFixed, is there always a '.', which is why '20' does not get changed to '2'? It is really '20.'?
  console.log(result);
  // Removes trailing '.'
  result = result.replace(/\.$/, '');
  console.log(result);
  
  // Copies array
  const newFullInput = [...fullInput];
  // Updates array with old operands removed, result inserted
  newFullInput.splice(operatorPos - 1, 3, result);

  // Returns an array to getResult with what is left to calculate
  return getResult(newFullInput);
}

export default getResult;
