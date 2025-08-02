const isEmail = (email) => 
  String(email)
  .toLowerCase()
  .match(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );

const signupValidator = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export default signupValidator;