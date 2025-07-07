const validateExtension = (ext) => {
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    return true;
  }
  return false;
}

module.exports = {
  validateExtension
}