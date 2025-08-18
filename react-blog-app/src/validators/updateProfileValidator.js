const isEmail = (email) => 
  String(email)
  .toLowerCase()
  .match(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );

const updateProfileValidator = ({ name, email }) => {
  const errors = {
    name: '',
    email: '',
  }

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  return errors;
}

export default updateProfileValidator;