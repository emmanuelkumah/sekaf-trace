const validatePlantingForm = (formData) => {
  const errors = {};
  if (formData.get("cropName") === "") {
    errors.cropName = "Enter crop name";
  }
  if (formData.get("activityDate") === "") {
    errors.activityDate = "Select activity date";
  }
  if (formData.get("kilosPlanted") === "") {
    errors.kilosPlanted = "Enter kilos planted";
  }
  if (formData.get("landSize") === "") {
    errors.landSize = "Enter land size";
  }
  if (formData.get("supervisorName") === "") {
    errors.supervisorName = "Enter supervisor name";
  }
  if (formData.get("supervisorContact") === "") {
    errors.supervisorContact = "Enter supervisor contact";
  }
  return errors;
};

export default validatePlantingForm;
