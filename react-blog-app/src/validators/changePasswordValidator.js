const changePasswordValidator = ({ oldPassword, newPassword }) => {
  const errors = {
    oldPassword: "",
    newPassword: "",
  }

  if (!oldPassword) {
    errors.oldPassword = "Old password is required";
  }

  if (!newPassword) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters long";
  }

  if (oldPassword && oldPassword === newPassword) {
    errors.newPassword = "New password must be different from old password";
  }

  return errors;
}

export default changePasswordValidator;