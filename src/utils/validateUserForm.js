const validateUserForm = ({ name, value }) => {
  let newErrors = { ...errors };
  switch (name) {
    case "email":
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }

      break;
    case "password":
      if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value)
      ) {
        newErrors.password =
          "Password must include lowercase, uppercase, number, and special character";
      } else {
        delete newErrors.password;
      }
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
      break;
    case "confirmPassword":
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
      break;
    case "phone":
      if (value.length !== 10 || value[0] !== "0") {
        newErrors.phone =
          "Invalid phone number. Please provide a 10-digit number.";
      } else {
        delete newErrors.phone;
      }

    default:
      break;
  }
  setErrors(newErrors);
};

export default validateUserForm;
