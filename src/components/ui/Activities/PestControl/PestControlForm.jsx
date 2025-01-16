import React, { act, useState } from "react";
import { Select, Label, TextInput } from "flowbite-react";
import BackButton from "../../BackButton";
import { useFetcher, data, redirect } from "react-router-dom";
import SubmitBtn from "../../SubmitBtn";
const PestControlForm = () => {
  const [activities, setActivities] = useState({
    activityDate: "",
    cropStage: "",
    chemicalName: "",
    chemicalApplicationRate: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualification: "",
    otherSupervisorQualification: "",
  });

  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const errors = fetcher.data?.errors;

  const handlePestControlActivitiesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };
  return (
    <>
      <div className="container mx-auto">
        <fetcher.Form className=" w-full" method="post">
          <div>
            <Label
              htmlFor="stage"
              value="Crop stage"
              className="my-2 font-semibold"
            />

            <Select
              id="stage"
              required
              onChange={handlePestControlActivitiesChange}
              name="cropStage"
              value={activities.cropStage}
            >
              <option>Select crop stage</option>
              <option value="EARLY_STAGE">Early stage</option>
              <option value="GROWING_STAGE">Growing stage</option>
              <option value="PRE_HARVESTING_STAGE">Preharvesting stage</option>
            </Select>
          </div>
          <div className="grid grid-cols-1">
            <Label htmlFor="planting" className="font-semibold my-4">
              Activity Date
            </Label>
            <input
              type="date"
              name="activityDate"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={activities.activityDate}
              onChange={handlePestControlActivitiesChange}
            />
          </div>
          {activities.cropStage && (
            <section>
              <div className="my-2">
                <Label htmlFor="chemical" className="font-semibold my-2">
                  Name of chemical
                </Label>
                <TextInput
                  id="chemical"
                  type="text"
                  placeholder="Enter the name of chemical"
                  name="chemicalName"
                  value={activities.chemicalName}
                  onChange={handlePestControlActivitiesChange}
                />
              </div>
              <div className="my-2">
                <Label htmlFor="rate" className="font-semibold my-2">
                  Rate of application
                </Label>
                <TextInput
                  id="rate"
                  type="number"
                  placeholder="Enter the rate of application in ml units"
                  name="chemicalApplicationRate"
                  value={activities.chemicalApplicationRate}
                  onChange={handlePestControlActivitiesChange}
                />
              </div>
            </section>
          )}

          <section>
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
                onChange={handlePestControlActivitiesChange}
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
                placeholder="Enter name of supervisor"
                id="contact"
                name="supervisorContact"
                value={activities.supervisorContact}
                onChange={handlePestControlActivitiesChange}
              />
            </div>
            <div>
              <Label
                htmlFor="cert"
                value="Select supervisor qualification"
                className="my-2 font-semibold"
              />

              <Select
                id="supervisorQualification"
                required
                name="supervisorQualification"
                value={activities.supervisorQualification}
                onChange={handlePestControlActivitiesChange}
              >
                <option>Select Qualification</option>
                <option value="MOFA">MOFA</option>
                <option value="EPA">EPA</option>
                <option value="PPRSD/NPPO">PPRSD/NPPO</option>
                <option value="Others">Others</option>
              </Select>
            </div>
            {activities.supervisorQualification === "Others" && (
              <div className="my-4">
                <TextInput
                  type="text"
                  required
                  placeholder="Enter other qualification of supervisor"
                  id="supervisor"
                  name="OtherSupervisorQualification"
                  value={activities.otherSupervisorQualification}
                  onChange={handlePestControlActivitiesChange}
                />
              </div>
            )}
          </section>

          <SubmitBtn busy={busy} />
        </fetcher.Form>
      </div>
    </>
  );
};

export default PestControlForm;
