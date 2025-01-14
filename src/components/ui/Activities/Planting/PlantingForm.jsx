import React, { useState } from "react";
import { Select, Label, TextInput, Datepicker } from "flowbite-react";
import BackButton from "../../BackButton";
import { useFetcher } from "react-router-dom";
import ActionBtn from "../../ActionBtn";
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
  console.log(activities);
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  const handlePlantingActivityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString();
    console.log(formattedDate);
    // setActivities((prevVal) => ({
    //   ...prevVal,
    //   activityDate: formattedDate,
    // }));
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
              min={new Date()}
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
              required
              placeholder="Crop name"
              name="cropName"
              id="crop"
              value={activities.cropName}
              onChange={handlePlantingActivityChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="kilo"
              value="Kilo planted"
              className="my-2 font-semibold"
            />
            <TextInput
              type="number"
              required
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
