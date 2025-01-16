import React, { useState } from "react";
import { Select, Label, TextInput } from "flowbite-react";
import BackButton from "../../BackButton";
import { useFetcher, data, redirect } from "react-router-dom";
import ActionBtn from "../../SubmitBtn";
import validatePlantingForm from "../../../../validate/validatePlantingForm";
const PlantingForm = () => {
  const [activities, setActivities] = useState({
    activityDate: "",
    cropName: "",
    kilosPlanted: "",
    landSizeCovered: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualitification: "",
    otherQualification: "",
  });
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const errors = fetcher.data?.errors;

  console.log(errors);

  const handlePlantingActivityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <BackButton />

        <fetcher.Form className="w-full" method="post">
          <div className="grid grid-cols-1">
            <Label htmlFor="planting" className="font-semibold my-4">
              Planting Date
            </Label>
            <input
              type="date"
              name="activityDate"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={activities.activityDate}
              onChange={handlePlantingActivityChange}
            />
          </div>

          <div className="my-4">
            <Label
              htmlFor="crop"
              value="Name of crop"
              className="my-2 font-semibold"
            />
            <TextInput
              type="text"
              placeholder="Crop name"
              name="cropName"
              id="crop"
              value={activities.cropName}
              onChange={handlePlantingActivityChange}
            />
            {errors?.cropName && (
              <p className="mt-1 text-sm text-red-600">{errors.cropName}</p>
            )}
          </div>
          <div className="my-4">
            <Label
              htmlFor="kilo"
              value="Kilo planted"
              className="my-2 font-semibold"
            />
            <TextInput
              type="number"
              placeholder="Kilo of seeds planted"
              name="kilosPlanted"
              id="kilo"
              value={activities.kilosPlanted}
              onChange={handlePlantingActivityChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="size"
              value="Land size covered on that date"
              className="my-2 font-semibold"
            />
            <TextInput
              type="number"
              required
              placeholder="Enter land size covered"
              id="size"
              name="landSizeCovered"
              value={activities.landSizeCovered}
              onChange={handlePlantingActivityChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="supervisor"
              value="Supervisor"
              className="my-2 font-semibold"
            />
            <TextInput
              type="text"
              required
              placeholder="Enter name of supervisor"
              id="supervisor"
              name="supervisorName"
              value={activities.supervisorName}
              onChange={handlePlantingActivityChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="contact"
              value="Contact of the supervisor"
              className="my-2 font-semibold"
            />
            <TextInput
              type="number"
              required
              placeholder="Enter contact of supervisor"
              id="contact"
              name="supervisorContact"
              maxLength={10}
              value={activities.supervisorContact}
              onChange={handlePlantingActivityChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="cert"
              value="Select Supervisor Certificate"
              className="my-2 font-semibold"
            />

            <Select
              id="cert"
              required
              name="supervisorQualitification"
              value={activities.supervisorQualitification}
              onChange={handlePlantingActivityChange}
            >
              <option value="MOFA">MOFA</option>
              <option value="EPA">EPA</option>
              <option value="PPRSD/NPPO">PPRSD/NPPO</option>
              <option value="Others">Others</option>
            </Select>
          </div>
          {activities.supervisorQualitification === "Others" && (
            <div>
              <Label
                htmlFor="certificate"
                value="Other Certificate"
                className="my-2 font-semibold"
              />
              <TextInput
                type="text"
                required
                placeholder="Enter the certificate of supervisor if not listed above"
                id="certificate"
                name="otherQualification"
                value={activities.otherQualification}
                onChange={handlePlantingActivityChange}
              />
            </div>
          )}
          <ActionBtn>{busy ? "submitting" : "submit"}</ActionBtn>
        </fetcher.Form>
      </div>
    </>
  );
};

export default PlantingForm;
export const action = async ({ request }) => {
  const formData = await request.formData();
  const errors = validatePlantingForm(formData);

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  const getSupervisorQualification = () => {
    if (formData.get("supervisorQualification") === "Others") {
      return formData.get("otherSupervisorQualification");
    }
    return formData.get("supervisorQualification");
  };
  const plantingData = {
    activityDate: formData.get("activityDate"),
    cropName: formData.get("cropName"),
    kilosPlanted: formData.get("kilosPlanted"),
    landSizeCovered: formData.get("landSizeCovered"),
    supervisorName: formData.get("supervisorName"),
    supervisorContact: formData.get("supervisorContact"),
    supervisorQualitification: getSupervisorQualification(),
  };
  console.log(plantingData);
  return redirect("/app/farms");
};
