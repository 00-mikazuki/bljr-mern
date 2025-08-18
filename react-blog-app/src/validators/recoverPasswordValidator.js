const recoverPasswordValidator = ({ code, password }) => {
  const errors = {
    code: "",
    password: "",
  }

  if (!code) {
    errors.code = "Verification code is required";
  }

  if (!password) {
    errors.password = "New password is required";
  } else if (password.length < 6) {
    errors.password = "New password must be at least 6 characters long";
  }

  return errors;
}

export default recoverPasswordValidator;