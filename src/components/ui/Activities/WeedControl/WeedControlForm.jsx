import { useState } from "react";
import { Select, Label, TextInput } from "flowbite-react";
import { useFetcher } from "react-router-dom";
import ActionBtn from "../../ActionBtn";
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
  console.log(fetcher);
  const handleWeedControlActivitiesChange = () => {
    console.log("track changes in activities");
  };
  return (
    <section>
      <div className="container mx-auto">
        <fetcher.Form
          className="container mx-auto w-full md:w-[70%]"
          method="post"
        >
          <div className="my-4">
            <Label htmlFor="weed" className="font-semibold my-2">
              Activity date
            </Label>
            {/* <Datepicker
              id="weed"
              name="activityDate"
              placeholder="Select date of weed control"
              maxDate={new Date()}
              value={activityDate}
              onSelectedDateChanged={(date) => handleDateChange(date)}
            /> */}
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
              onChange={handleWeedControlActivitiesChange}
              value={activities.weedControlMethod}
            >
              <option>Select method of weed control</option>
              <option value="MANUAL">Manual</option>
              <option value="CHEMICAL">Chemical</option>
            </Select>
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
                  onChange={handleWeedControlActivitiesChange}
                />
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
                />
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
                    onChange={handleWeedControlActivitiesChange}
                  />
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
                    onChange={handleWeedControlActivitiesChange}
                  />
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
                    onChange={handleWeedControlActivitiesChange}
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
                      value={activities.otherSupervisorQualification}
                      onChange={handleWeedControlActivitiesChange}
                    />
                  </div>
                )}
              </section>
            </div>
          )}
          <ActionBtn>{busy ? "submiting" : "sumbit  "}</ActionBtn>
        </fetcher.Form>
      </div>
    </section>
  );
};

export default WeedControlForm;
