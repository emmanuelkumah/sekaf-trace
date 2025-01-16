import { useState } from "react";
import { Select, Label, TextInput } from "flowbite-react";
import { data, useFetcher, redirect } from "react-router-dom";
import ActionBtn from "../../SubmitBtn";
import validateWeedControlForm from "../../../../validate/validateWeedControlForm";
const WeedControlForm = () => {
  const [activities, setActivities] = useState({
    activityDate: new Date(),
    weedControlMethod: "",
    chemicalName: "",
    chemicalApplicationRate: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualification: "",
    otherSupervisorQualification: "",
  });

  const fetcher = useFetcher();
  const busy = fetcher.state === "idle";
  const errors = fetcher.data?.errors;
  console.log(errors);

  const handleActivityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prevVal) => ({
      ...prevVal,
      [name]: type === "checked" ? checked : value,
    }));
  };
  return (
    <main className="container mx-auto">
      <fetcher.Form className="w-full" method="post">
        <div className="grid grid-cols-1 mt-4">
          <div className="flex flex-col">
            <Label htmlFor="weed" className="font-semibold my-2">
              Activity date
            </Label>
            <input
              type="date"
              name="activityDate"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              value={activities.activityDate}
              onChange={handleActivityChange}
            />
          </div>

          <div className="my-4">
            <Label
              htmlFor="method"
              value="Method of weed control"
              className="my-2 font-semibold"
            />

            <Select
              id="method"
              required
              name="weedControlMethod"
              color={errors?.weedControlMethod && "failure"}
              onChange={handleActivityChange}
              value={activities.weedControlMethod}
            >
              <option>Select method of weed control</option>
              <option value="MANUAL">Manual</option>
              <option value="CHEMICAL">Chemical</option>
            </Select>
            {errors?.weedControlMethod && (
              <p className="mt-1 text-sm text-red-600">
                {errors.weedControlMethod}
              </p>
            )}
          </div>
          {activities.weedControlMethod === "CHEMICAL" && (
            <div>
              <div className="my-4">
                <Label
                  htmlFor="chemical"
                  value="Name of chemical"
                  className="my-2 font-semibold"
                />
                <TextInput
                  type="text"
                  required
                  placeholder="Enter name of chemical"
                  id="chemical"
                  name="chemicalName"
                  value={activities.chemicalName}
                  onChange={handleActivityChange}
                />
                {errors?.chemicalName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.chemicalName}
                  </p>
                )}
              </div>
              <div className="my-4">
                <Label
                  htmlFor="rate"
                  value="Rate of chemical application (in ml)"
                  className="my-2 font-semibold"
                />
                <TextInput
                  type="text"
                  required
                  placeholder="Enter rate of application"
                  id="rate"
                  name="chemicalApplicationRate"
                  value={activities.chemicalApplicationRate}
                  onChange={handleActivityChange}
                />
                {errors?.chemicalApplicationRate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.chemicalApplicationRate}
                  </p>
                )}
              </div>
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
                    onChange={handleActivityChange}
                  />
                  {errors?.supervisorName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.supervisorName}
                    </p>
                  )}
                </div>
                <div className="my-4">
                  <Label
                    htmlFor="contact"
                    value="Contact of the supervisor"
                    className="my-2 font-semibold"
                  />
                  <TextInput
                    type="text"
                    required
                    placeholder="Enter contact of supervisor"
                    id="contact"
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
                <div className="my-4">
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
                    <option>Select qualification</option>
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
                </div>
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
              </section>
            </div>
          )}
          <ActionBtn>{busy ? "submiting" : "sumbit  "}</ActionBtn>
        </div>
      </fetcher.Form>
    </main>
  );
};

export default WeedControlForm;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const errors = validateWeedControlForm(formData);
  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  const getSupervisorQualification = () => {
    if (formData.get("supervisorQualification") === "Others") {
      return formData.get("otherSupervisorQualification");
    }
    return formData.get("supervisorQualification");
  };
  const getDataToSubmit = () => {
    if (formData.get("weedControlMethod") === "MANUAL") {
      return {
        activityDate: formData.get("activityDate"),
        weedControlMethod: formData.get("weedControlMethod"),
      };
    }
    return {
      activityDate: formData.get("activityDate"),
      weedControlMethod: formData.get("weedControlMethod"),
      chemicalName: formData.get("chemicalName"),
      chemicalApplicationRate: formData.get("chemicalApplicationRate"),
      supervisorName: formData.get("supervisorName"),
      supervisorContact: formData.get("supervisorContact"),
      supervisorQualification: getSupervisorQualification(),
    };
  };
  const weedControlData = getDataToSubmit();
  console.log(weedControlData);
  return redirect("/app/farms");
};
