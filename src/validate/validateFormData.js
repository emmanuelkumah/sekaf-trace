export const validateAddUserData = (userFormData) => {
  const errors = {};
  if (userFormData.firstName === "") {
    errors.firstName = "Enter first name";
  }
  if (userFormData.lastName === "") {
    errors.lastName = "Enter last name";
  }
  if (!/[^A-Za-z0-9]/.test(userFormData.password)) {
    errors.password =
      "Password must include lowercase, uppercase, number, and special character";
  }

  if (!userFormData.email.includes("@")) {
    errors.email = "Invalid email address";
  }
  if (userFormData.password !== userFormData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (userFormData.phone.length !== 12 || userFormData.phone[0] !== "2") {
    errors.phone = "Invalid phone number. Please provide a 10-digit number.";
  }
  if (userFormData.userRole === "") {
    errors.userRole = "Select a role";
  }
  return errors;
};
