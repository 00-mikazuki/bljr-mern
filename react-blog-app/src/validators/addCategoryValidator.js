const addCategoryValidator = ({ name }) => {
  const errors = {
    name: "",
  }

  if (!name) {
    errors.name = "Title is required";
  } 

  return errors;
}

export default addCategoryValidator;