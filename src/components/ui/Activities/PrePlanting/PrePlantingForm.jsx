import React, { useState } from "react";
import { Label, TextInput, Select, Radio } from "flowbite-react";
import { useFetcher, data, redirect } from "react-router-dom";
import SubmitBtn from "../../SubmitBtn";
import { validatePreplantingFormData } from "../../../../utils/validatePreplantingFormData";

const PrePlantingForm = () => {
  const [activities, setFormActivities] = useState({
    activityDate: new Date().toISOString().split("T")[0],
    plantingMaterialSource: "",
    otherPlantingMaterialSource: "",
    plantingMaterial: "",
    plantingMaterialQuantity: "1",
    plantingMaterialYield: "",
    isPlantingMaterialTreated: "no",
    plantingMaterialTreatmentMethod: "",
    otherTreatmentMethod: "",
    chemicalSprayed: "",
    rateOfChemicalApplication: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualification: "",
    otherSupervisorQualification: "",
  });
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const errors = fetcher.data?.errors;

  const handleActivityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };

  return (
    <main className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-4">Pre-Planting Activities</h2>
      <fetcher.Form method="post" className="w-full">
        <div className="grid grid-cols-1 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label
                htmlFor="date"
                value="Select the activity date"
                className="mb-2"
              />
              <input
                type="date"
                name="activityDate"
                id="date"
                min={new Date().toISOString().split("T")[0]}
                value={activities.activityDate}
                onChange={handleActivityChange}
              />

              <div className="my-4">
                <div className="flex flex-col">
                  <Label
                    htmlFor="source"
                    value="Select source of planting material"
                    className="my-2 font-semibold"
                  />

                  <Select
                    id="source"
                    name="plantingMaterialSource"
                    color={errors?.plantingMaterialSource && "failure"}
                    required
                    value={activities.plantingMaterialSource}
                    onChange={handleActivityChange}
                  >
                    <option>Select planting material source</option>
                    <option value="Local inputs dealer">
                      Local inputs dealer
                    </option>
                    <option value="MOFA">MOFA</option>
                    <option value="BJL">BJL</option>
                    <option value="Own field">Own field</option>
                    <option value="Imported">Imported</option>
                    <option value="Others">Others</option>
                  </Select>
                  {errors?.plantingMaterialSource && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.plantingMaterialSource}
                    </p>
                  )}
                </div>

                {activities.plantingMaterialSource === "Others" && (
                  <div className="flex flex-col">
                    <Label
                      htmlFor="seed"
                      value="Other Source"
                      className="my-2 font-semibold"
                    />
                    <TextInput
                      id="seed"
                      type="text"
                      name="otherPlantingMaterialSource"
                      color={errors?.otherPlantingMaterialSource && "failure"}
                      value={activities.otherPlantingMaterialSource}
                      onChange={handleActivityChange}
                      placeholder="Enter where you got the source from"
                    />
                    {errors?.otherPlantingMaterialSource && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.otherPlantingMaterialSource}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="my-4">
                <Label
                  htmlFor="planting"
                  value="Select planting material"
                  className="my-2 font-semibold"
                />
                <Select
                  id="planting"
                  required
                  name="plantingMaterial"
                  color={errors?.plantingMaterial && "failure"}
                  value={activities.plantingMaterial}
                  onChange={handleActivityChange}
                >
                  <option>Select the planting material</option>
                  <option value="seed">Seed</option>
                  <option value="sucker">Sucker</option>
                  <option value="seedlings">Seedlings</option>
                  <option value="tuber">Tuber</option>
                  <option value="stem">Stem</option>
                  <option value="rhizome">Rhizome</option>
                  <option value="bulbs">Bulbs</option>
                </Select>
                {errors?.plantingMaterial && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.plantingMaterial}
                  </p>
                )}
              </div>
              <div className="my-4">
                <Label
                  htmlFor="quantity"
                  value="Quantity of planting material"
                  className="my-2 font-semibold"
                />
                <TextInput
                  id="quantity"
                  type="number"
                  min="0"
                  name="plantingMaterialQuantity"
                  color={errors?.plantingMaterialQuantity && "failure"}
                  value={activities.plantingMaterialQuantity}
                  onChange={handleActivityChange}
                  placeholder="Enter quantity"
                />
                {errors?.plantingMaterialQuantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.plantingMaterialQuantity}
                  </p>
                )}
              </div>
              <div className="my-4">
                <Label
                  htmlFor="yield"
                  value="Yield of planting material per acre"
                  className="mb-2 font-semibold"
                />
                <TextInput
                  id="yield"
                  type="number"
                  min="0"
                  name="plantingMaterialYield"
                  placeholder="Enter yield"
                  value={activities.plantingMaterialYield}
                  onChange={handleActivityChange}
                />
                {errors?.plantingMaterialYield && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.plantingMaterialYield}
                  </p>
                )}
              </div>
              <div className="my-4">
                <fieldset className="flex flex-col gap-4">
                  <legend className="my-2 font-semibold">
                    Was planting material treated?
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="yes-treatment"
                      name="isPlantingMaterialTreated"
                      value="yes"
                      checked={activities.isPlantingMaterialTreated === "yes"}
                      onChange={handleActivityChange}
                    />
                    <Label htmlFor="yes-treatment">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="no-treatment"
                      name="isPlantingMaterialTreated"
                      value="no"
                      checked={activities.isPlantingMaterialTreated === "no"}
                      onChange={handleActivityChange}
                    />
                    <Label htmlFor="no-treatment">No</Label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          {activities.isPlantingMaterialTreated === "yes" && (
            <div className="flex flex-col gap-4">
              <div>
                <Label
                  className="mb-2 font-semibold"
                  htmlFor="method"
                  value="Select treatment method"
                />
                <Select
                  id="method"
                  required
                  name="plantingMaterialTreatmentMethod"
                  value={activities.plantingMaterialTreatmentMethod}
                  onChange={handleActivityChange}
                >
                  <option>Select treatment method</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Hot water">Hot water</option>
                  <option value="Other">Other</option>
                </Select>
                {errors?.plantingMaterialTreatmentMethod && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.plantingMaterialTreatmentMethod}
                  </p>
                )}
                {activities.plantingMaterialTreatmentMethod === "Other" && (
                  <div className="my-4">
                    <Label
                      className="mb-2 font-semibold"
                      htmlFor="other"
                      value="Other treatment method or chemical used"
                    />
                    <TextInput
                      id="other"
                      type="text"
                      required
                      name="otherTreatmentMethod"
                      value={activities.otherTreatmentMethod}
                      placeholder="Enter the other treatment method or chemical used"
                      onChange={handleActivityChange}
                    />
                  </div>
                )}
              </div>
              {activities.plantingMaterialTreatmentMethod === "Chemical" && (
                <section>
                  <div className="my-4">
                    <div>
                      <Label
                        htmlFor="chemical"
                        value="Name of chemical"
                        className="mb-2"
                      />
                      <TextInput
                        id="chemical"
                        type="text"
                        name="chemicalSprayed"
                        required
                        placeholder="Enter chemical name "
                        value={activities.chemicalSprayed}
                        onChange={handleActivityChange}
                      />
                    </div>
                    {errors?.chemicalSprayed && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.chemicalSprayed}
                      </p>
                    )}
                  </div>
                  <div className="my-4">
                    <div className="flex flex-col">
                      <Label
                        htmlFor="rate"
                        value="Rate of chemical application(ml)"
                        className="mb-2"
                      />
                      <TextInput
                        id="rate"
                        type="number"
                        name="rateOfChemicalApplication"
                        required
                        placeholder="Enter rate of chemical application "
                        value={activities.rateOfChemicalApplication}
                        onChange={handleActivityChange}
                      />
                      {errors?.rateOfChemicalApplication && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.rateOfChemicalApplication}
                        </p>
                      )}
                    </div>
                  </div>
                  <section>
                    <div className="my-2">
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
                        onChange={handleActivityChange}
                      />
                      {errors?.supervisorName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.supervisorName}
                        </p>
                      )}
                    </div>
                    <div className="my-2">
                      <Label
                        htmlFor="supervisor"
                        value="Supervisor Contact"
                        className="my-2 font-semibold"
                      />
                      <TextInput
                        type="number"
                        required
                        placeholder="Enter contact of supervisor"
                        id="supervisor"
                        name="supervisorContact"
                        value={activities.supervisorContact}
                        onChange={handleActivityChange}
                      />
                      {errors?.supervisorContact && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.supervisorContact}
                        </p>
                      )}
                    </div>
                    <div className="my-2">
                      <Label
                        htmlFor="cert"
                        value="Select supervisor certificate"
                        className="my-2 font-semibold"
                      />

                      <Select
                        id="cert"
                        required
                        name="supervisorQualification"
                        value={activities.supervisorQualification}
                        onChange={handleActivityChange}
                      >
                        {" "}
                        <option>Select Qualification</option>
                        <option value="MOFA">MOFA</option>
                        <option value="EPA">EPA</option>
                        <option value="PPRSD/NPPO">PPRSD/NPPO</option>
                        <option value="Others">Others</option>
                      </Select>
                      {errors?.supervisorQualification && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.supervisorQualification}
                        </p>
                      )}
                      {activities.supervisorQualification === "Others" && (
                        <div className="my-4">
                          <TextInput
                            type="text"
                            required
                            placeholder="Enter other qualification of supervisor"
                            id="supervisor"
                            name="otherSupervisorQualification"
                            value={activities.otherSupervisorQualification}
                            onChange={handleActivityChange}
                          />
                        </div>
                      )}
                      {errors?.otherSupervisorQualification && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.otherSupervisorQualification}
                        </p>
                      )}
                    </div>
                  </section>
                </section>
              )}
            </div>
          )}
          <SubmitBtn busy={busy} />
        </div>
      </fetcher.Form>
    </main>
  );
};

export default PrePlantingForm;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const errors = validatePreplantingFormData(formData);

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  const getPlantingMaterialSource = () => {
    if (formData.get("plantingMaterialSource") === "Others") {
      return formData.get("otherPlantingMaterialSource");
    }
    return formData.get("plantingMaterialSource");
  };

  const isPlantingMaterialTreated = () => {
    return formData.get("isPlantingMaterialTreated") === "yes";
  };

  const getSupervisorQualification = () => {
    if (formData.get("supervisorQualification") === "Others") {
      return formData.get("otherSupervisorQualification");
    }
    return formData.get("supervisorQualification");
  };

  const getRequiredDataToSubmit = () => {
    const plantingMaterialSource = getPlantingMaterialSource();
    const isMaterialTreated = isPlantingMaterialTreated();
    const treatmentMethod = formData.get("plantingMaterialTreatmentMethod");

    if (isMaterialTreated && treatmentMethod === "Chemical") {
      return {
        activityDate: formData.get("activityDate"),
        plantingMaterial: formData.get("plantingMaterial"),
        plantingMaterialSource,
        plantingMaterialQuantity: formData.get("plantingMaterialQuantity"),
        plantingMaterialYield: Number(formData.get("plantingMaterialYield")),
        isMaterialTreated,
        plantingMaterialTreatmentMethod: treatmentMethod,
        chemicalSprayed: formData.get("chemicalSprayed"),
        rateOfChemicalApplication: formData.get("rateOfChemicalApplication"),
        supervisorName: formData.get("supervisorName"),
        supervisorContact: formData.get("supervisorContact"),
        supervisorQualification: getSupervisorQualification(),
      };
    }

    if (isMaterialTreated && treatmentMethod === "Other") {
      return {
        activityDate: formData.get("activityDate"),
        plantingMaterial: formData.get("plantingMaterial"),
        plantingMaterialSource,
        plantingMaterialQuantity: formData.get("plantingMaterialQuantity"),
        plantingMaterialYield: Number(formData.get("plantingMaterialYield")),
        isMaterialTreated,
        plantingMaterialTreatmentMethod: treatmentMethod,
        otherTreatmentMethod: formData.get("otherTreatmentMethod"),
      };
    }
    if (isMaterialTreated && treatmentMethod === "Hot water") {
      return {
        activityDate: formData.get("activityDate"),
        plantingMaterial: formData.get("plantingMaterial"),
        plantingMaterialSource,
        plantingMaterialQuantity: formData.get("plantingMaterialQuantity"),
        plantingMaterialYield: Number(formData.get("plantingMaterialYield")),
        isMaterialTreated,
        plantingMaterialTreatmentMethod: treatmentMethod,
      };
    }
    return {
      activityDate: formData.get("activityDate"),
      plantingMaterial: formData.get("plantingMaterial"),
      plantingMaterialSource,
      plantingMaterialQuantity: formData.get("plantingMaterialQuantity"),
      plantingMaterialYield: Number(formData.get("plantingMaterialYield")),
      isMaterialTreated,
    };
  };

  const preplantingData = getRequiredDataToSubmit();

  console.log(preplantingData);
  // Redirect to dashboard if validation is successful
  return redirect("/app/farms");
};
