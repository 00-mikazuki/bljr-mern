const generateCode = (codeLength = 4) => {
  const number = Math.random().toString().slice(2);
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    code += number[number.length - i - 1] || '0'; // Fallback to '0' if index is out of bounds
  }

  return code;
}

module.exports = generateCode;