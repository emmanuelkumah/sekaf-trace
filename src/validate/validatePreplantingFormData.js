export const validatePreplantingFormData = (formData) => {
  const errors = {};
  if (
    formData.get("plantingMaterialSource") === "Select planting material source"
  ) {
    errors.plantingMaterialSource = "Select source of planting material";
  }
  if (formData.get("plantingMaterial") === "Select the planting material") {
    errors.plantingMaterial = "Select planting material";
  }
  if (
    formData.get("plantingMaterialSource") === "Others" &&
    formData.get("otherPlantingMaterialSource") === ""
  ) {
    errors.otherPlantingMaterialSource =
      "Enter other source of planting material";
  }
  if (formData.get("plantingMaterialQuantity") === "0") {
    errors.plantingMaterialQuantity = "Enter quantity of planting material";
  }
  if (formData.get("plantingMaterialYield") === "") {
    errors.plantingMaterialYield = "Enter yield of planting material";
  }
  if (formData.get("activityDate") === "") {
    errors.activityDate = "Select activity date";
  }
  if (
    formData.get("isPlantingMaterialTreated") === "yes" &&
    formData.get("plantingMaterialTreatmentMethod") ===
      "Select treatment method"
  ) {
    errors.plantingMaterialTreatmentMethod = "Select treatment method";
  }
  if (
    formData.get("isPlantingMaterialTreated") === "yes" &&
    formData.get("plantingMaterialTreatmentMethod") === "Chemical" &&
    formData.get("chemicalSprayed") === ""
  ) {
    errors.chemicalSprayed = "Enter chemical name";
  }
  if (
    formData.get("plantingMaterialTreatmentMethod") === "Chemical" &&
    formData.get("rateOfChemicalApplication") === ""
  ) {
    errors.rateOfChemicalApplication = "Enter rate of chemical application";
  }
  if (
    formData.get("supervisorQualification") === "Others" &&
    formData.get("otherSupervisorQualification") === ""
  ) {
    errors.otherSupervisorQualification =
      "Enter other qualification of supervisor";
  }
  if (formData.get("supervisorQualification") === "Select Qualification") {
    errors.supervisorQualification = "Select supervisor qualification";
  }
  if (formData.get("supervisorContact") === "") {
    errors.supervisorContact = "Enter supervisor contact";
  }
  if (formData.get("supervisorName") === "") {
    errors.supervisorName = "Enter supervisor name";
  }
  return errors;
};
