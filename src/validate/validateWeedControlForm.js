const validateWeedControlForm = (formData) => {
  const errors = {};
  if (formData.get("weedControlMethod") === "Select method of weed control") {
    errors.weedControlMethod = "Select weed control method";
  }
  if (formData.get("chemicalName") === "") {
    errors.chemicalName = "Enter name of chemical";
  }
  if (
    formData.get("weedControlMethod") === "CHEMICAL" &&
    formData.get("chemicalApplicationRate") === ""
  ) {
    errors.chemicalApplicationRate = "Enter rate of chemical application";
  }
  if (formData.get("superivisorName") === "") {
    errors.superivisorName = "Enter name of supervisor";
  }
  if (formData.get("supervisorContact") === "") {
    errors.supervisorContact = "Enter contact of supervisor";
  }
  if (formData.get("supervisorQualification") === "Select qualification") {
    errors.supervisorQualification = "Select qualification of supervisor";
  }
  return errors;
};

export default validateWeedControlForm;
