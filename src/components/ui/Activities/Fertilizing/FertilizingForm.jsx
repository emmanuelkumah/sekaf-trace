import React, { useState } from "react";
import { Select, Label, TextInput } from "flowbite-react";
import BackButton from "../../BackButton";
import { useFetcher, data, redirect } from "react-router-dom";
import SubmitBtn from "../../SubmitBtn";
const FertilizingForm = () => {
  const [activities, setActivities] = useState({
    activityDate: "",
    fertilizerType: "",
    fertilizerName: "",
    otherFertilizerName: "",
    applicationMethod: "",
    applicationRateMlPerAcre: "",
    applicationRateBagPerAcre: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualification: "",
    otherSupervisorQualification: "",
  });
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const errors = fetcher.data?.errors;

  const handleFertilizerActivitiesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };
  return (
    <>
      <div className="container mx-auto">
        <BackButton />
        <fetcher.Form className="container mx-auto w-full" method="post">
          <div className="grid grid-cols-1">
            <Label htmlFor="planting" className="font-semibold my-4">
              Fertilizing Date
            </Label>
            <input
              type="date"
              name="activityDate"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={activities.activityDate}
              onChange={handleFertilizerActivitiesChange}
            />
          </div>

          <div className="my-4">
            <Label
              htmlFor="fertilizer"
              value="Type of fertilizer"
              className="my-2 font-semibold"
            />

            <Select
              id="fertilizer"
              required
              name="fertilizerType"
              value={activities.fertilizerType}
              onChange={handleFertilizerActivitiesChange}
            >
              <option>Select type of fertilizer</option>
              <option value="LIQUID">Liquid</option>
              <option value="ORGANIC">Organic</option>
              <option value="INORGANIC">Inorganic</option>
            </Select>
          </div>
          <div className="my-4">
            <Label
              htmlFor="chemical"
              value="Name of fertilizer"
              className="my-2 font-semibold"
            />
            <Select
              id="method"
              required
              name="fertilizerName"
              value={activities.fertilizerName}
              onChange={handleFertilizerActivitiesChange}
            >
              <option>Select fertilizer name</option>
              <option value="Manure">Manure</option>
              <option value="Compost">Compost</option>
              <option value="NPK">NPK</option>
              <option value="Urea">Urea</option>
              <option value="SOA">SOA</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          {activities.fertilizerName === "Other" && (
            <div className="my-4">
              <Label
                htmlFor="others"
                value="Other fertilizer used"
                className="my-2 font-semibold"
              />
              <TextInput
                type="text"
                placeholder="Enter name of the other fertilizer"
                id="others"
                name="otherFertilizerName"
                value={activities.otherFertilizerName}
                onChange={handleFertilizerActivitiesChange}
              />
            </div>
          )}
          <div className="my-4">
            <Label
              htmlFor="method"
              value="Fertilizer application method"
              className="my-2 font-semibold"
            />
            <TextInput
              type="text"
              placeholder="Enter the application method"
              id="rate-apply"
              name="applicationMethod"
              value={activities.applicationMethod}
              onChange={handleFertilizerActivitiesChange}
            />
          </div>

          <div className="my-4">
            <Label
              htmlFor="rate-apply"
              value="Rate of application(ml per acre)"
              className="my-2 font-semibold"
            />
            <TextInput
              type="number"
              placeholder="Enter the rate of application"
              id="rate-apply"
              name="applicationRateMlPerAcre"
              value={activities.applicationRateMlPerAcre}
              onChange={handleFertilizerActivitiesChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="rate-apply2"
              value="Rate of application(bag per acre)"
              className="my-2 font-semibold"
            />
            <TextInput
              type="text"
              placeholder="Enter the rate of application"
              id="rate-apply2"
              name="applicationRateBagPerAcre"
              value={activities.applicationRateBagPerAcre}
              onChange={handleFertilizerActivitiesChange}
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
              onChange={handleFertilizerActivitiesChange}
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
              value={activities.supervisorContact}
              onChange={handleFertilizerActivitiesChange}
            />
          </div>
          <div className="my-4">
            <Label
              htmlFor="cert"
              value="Select certificate of supervisor"
              className="my-2 font-semibold"
            />

            <Select
              id="cert"
              required
              name="supervisorQualification"
              value={activities.supervisorQualification}
              onChange={handleFertilizerActivitiesChange}
            >
              <option value="MOFA">MOFA</option>
              <option value="EPA">EPA</option>
              <option value="PPRSD/NPPO">PPRSD/NPPO</option>
              <option value="Others">Others</option>
            </Select>
            {activities.supervisorQualification === "Others" && (
              <div className="my-4">
                <TextInput
                  type="text"
                  required
                  placeholder="Enter other qualification of supervisor"
                  id="supervisor"
                  name="OtherSupervisorQualification"
                  value={activities.otherSupervisorQualification}
                  onChange={handleFertilizerActivitiesChange}
                />
              </div>
            )}
          </div>

          <SubmitBtn busy={busy} />
        </fetcher.Form>
      </div>
    </>
  );
};

export default FertilizingForm;
