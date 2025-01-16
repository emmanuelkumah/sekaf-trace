import React, { act, useState } from "react";
import { Select, Label, TextInput, Datepicker, Checkbox } from "flowbite-react";
import BackButton from "../../BackButton";
import { useFetcher } from "react-router-dom";
import ActionBtn from "../../SubmitBtn";
import { landPreparationActivities } from "../../../../utils/farmActivities";
const LandPreparationForm = () => {
  const [activities, setActivities] = useState({
    activityDate: "",
    landSize: null,

    chemicalSprayed: "",
    chemicalApplicationRate: "",
    supervisorName: "",
    supervisorContact: "",
    supervisorQualification: "",
    otherSupervisorQualification: "",
  });
  const fetcher = useFetcher();

  let busy = fetcher.state !== "idle";

  const handleLandPreperationActivityChange = () => {
    console.log("thing will change here");
  };

  return (
    <main className="container mx-auto">
      <fetcher.Form className="container mx-auto w-full" method="post">
        <div className="flex flex-col">
          <div className="my-4">
            <Label
              htmlFor="activity"
              value="Select the land preparation activity"
              className="my-2 font-semibold text-xl"
            />

            {landPreparationActivities.map((activity) => {
              return (
                <div className="flex items-center gap-2" key={activity.id}>
                  <Checkbox
                    id={`land-activity-${activity.name}`}
                    value={activity.value}
                    name="landActivity"
                    onChange={handleLandPreperationActivityChange}
                    // checked={selectedActivities.includes(activity.value)}
                  />

                  <Label htmlFor={activity.id}>{activity.label}</Label>
                </div>
              );
            })}
            {/* <TextInput
              name="selectedActivities"
              value={selectedActivities}
              readOnly
              className="my-2"
            /> */}
          </div>
          <div className="grid grid-cols-1">
            <Label htmlFor="activity" className="text-md font-semibold my-2">
              Activity date
            </Label>
            <input
              type="date"
              name="activityDate"
              id="date"
              min={new Date()}
              value={activities.activityDate}
              onChange={handleLandPreperationActivityChange}
            />
          </div>
          <Label htmlFor="landsize" className="my-2 text-md">
            Land size (acres)
          </Label>
          <TextInput
            id="landsize"
            type="number"
            name="landSize"
            min={1}
            required
            placeholder="Enter land size"
            value={activities.landSize}
            onChange={handleLandPreperationActivityChange}
          />
          {true && (
            <div>
              <section className="my-2">
                <div>
                  <Label htmlFor="chemical" className="my-4">
                    Chemical sprayed
                  </Label>
                  <TextInput
                    type="text"
                    name="chemicalSprayed"
                    required
                    placeholder="Enter chemical sprayed"
                    id="chemical"
                    value={activities.chemicalSprayed}
                    onChange={handleLandPreperationActivityChange}
                  />
                </div>
                <div>
                  <Label htmlFor="entry" className="my-4">
                    Rate of application (ml)
                  </Label>
                  <TextInput
                    type="number"
                    required
                    placeholder="Enter rate of application"
                    id="entry"
                    name="chemicalApplicationRate"
                    value={activities.chemicalApplicationRate}
                    onChange={handleLandPreperationActivityChange}
                  />
                </div>
              </section>
              <section>
                <div className="my-4">
                  <Label
                    htmlFor="supervisor"
                    value="Name of the supervisor"
                    className="my-2 font-semibold"
                  />
                  <TextInput
                    type="text"
                    required
                    placeholder="Enter name of supervisor"
                    id="contact"
                    name="supervisorName"
                    value={activities.supervisorName}
                    onChange={handleLandPreperationActivityChange}
                  />
                </div>
                <div>
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
                    onChange={handleLandPreperationActivityChange}
                  />
                </div>
                <div className="my-4">
                  <Label
                    htmlFor="cert"
                    value="Select Certificate of supervisor"
                    className="my-2 font-semibold"
                  />

                  <Select
                    id="cert"
                    required
                    name="supervisorQualification"
                    value={activities.supervisorQualification}
                    onChange={handleLandPreperationActivityChange}
                  >
                    <option>Select qualification</option>
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
                      value={otherSupervisorQualification}
                      onChange={handleLandPreperationActivityChange}
                    />
                  </div>
                )}
              </section>
            </div>
          )}
        </div>

        <ActionBtn>{busy ? "submitting" : "submit"}</ActionBtn>
      </fetcher.Form>{" "}
    </main>
  );
};

export default LandPreparationForm;
export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log("Action triggered");
};
