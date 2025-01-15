import React from "react";
import BackButton from "../BackButton";
import {
  Label,
  TextInput,
  Radio,
  FileInput,
  Select,
  Datepicker,
} from "flowbite-react";
import { useFetcher, data, redirect } from "react-router-dom";
import ActionBtn from "../SubmitBtn";
import { FaRegUserCircle } from "react-icons/fa";
import { BiHome, BiPhone } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
const FarmerForm = () => {
  const fetcher = useFetcher();
  return (
    <>
      <div className="bg-secondary w-full md:w-1/2 h-[100%] rounded-lg shadow-md container mx-auto">
        <div className="mx-14 py-4">
          <BackButton />
        </div>

        <section className="flex flex-col justify-center items-center">
          <fetcher.Form className="w-[80vw] md:w-[80%] my-4 ">
            <div className="grid grid-cols-1 gap-4 md:gap-10">
              <section>
                <h2 className="text-xl text-main border-l-4 border-main pl-2 mb-4">
                  Farmer Details
                </h2>
                <div className="flex flex-col md:justify-evenly">
                  <fieldset className="flex flex-col md:flex-row gap-4">
                    <legend className="font-semibold mb-4"> Gender</legend>
                    <div className="flex items-center gap-2">
                      <Radio id="male" name="gender" value="MALE" required />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="female" name="gender" required />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      className="font-semibold md:text-lg"
                      htmlFor="file-upload"
                      value="Select picture"
                    />
                  </div>
                  <div className="flex gap-10">
                    <FileInput
                      id="file-upload"
                      accept="image/*"
                      name="picture"
                      required
                    />
                    {/* {previewUrl && (
                      <div>
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="firstName"
                        value="First name"
                        className="font-semibold"
                      />
                    </div>
                    <TextInput
                      id="firstName"
                      type="text"
                      icon={FaRegUserCircle}
                      placeholder="Enter firstname"
                      name="firstName"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="lastName"
                        value="Last name"
                        className="font-semibold"
                      />
                    </div>
                    <TextInput
                      id="lastName"
                      type="text"
                      icon={FaRegUserCircle}
                      placeholder="Enter last name"
                      defaultValue=""
                      name="lastName"
                      required
                    />
                  </div>
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="address"
                        value="Home address"
                        className="font-semibold"
                      />
                    </div>
                    <TextInput
                      id="address"
                      type="text"
                      icon={BiHome}
                      name="homeAddress"
                      defaultValue=""
                      placeholder="Enter home address"
                      required
                    />
                  </div>

                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="contact"
                        value="Contact"
                        className="font-semibold"
                      />
                    </div>
                    <TextInput
                      id="contact"
                      type="number"
                      icon={BiPhone}
                      maxLength="10"
                      name="phone"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="dob"
                        value="Date of birth"
                        className="font-semibold"
                      />
                    </div>

                    <Datepicker
                      name="dateOfBirth"
                      maxDate={new Date(2010, 1, 30)}
                      onSelectedDateChanged={(date) => handleDateChange(date)}
                    />
                  </div>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4 font-semibold">
                      Choose farmer type
                    </legend>
                    <div className="flex items-center gap-2">
                      <Radio id="farmer" name="farmerType" required />
                      <Label htmlFor="farmer">farmer</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Radio id="processor" name="farmerType" required />
                      <Label htmlFor="processor">Processor</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="both" name="farmerType" required />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </fieldset>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4 font-semibold">
                      Choose crop type
                    </legend>
                    <div className="flex items-center gap-2">
                      <Radio id="soya" name="cropType" required />
                      <Label htmlFor="soya">Soya</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio id="shea" name="cropType" required />
                      <Label htmlFor="shea">Shea </Label>
                    </div>
                  </fieldset>
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="region"
                        value="Select Region"
                        className="font-semibold"
                      />
                    </div>
                    <Select id="region" required name="regionId">
                      <option>Select region</option>
                      {[].map((region) => (
                        <option value={region.id} key={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div>
                  <div className="my-2 block">
                    <Label
                      htmlFor="district"
                      value="Select district"
                      className="font-semibold"
                    />
                  </div>
                  <Select
                    id="district"
                    required
                    className="w-full"
                    name="districtId"
                    defaultValue=""
                  >
                    <option>Select District</option>
                    {[].map((district) => (
                      <option value={district.id} key={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div>
                    <div className="my-2 block">
                      <Label
                        htmlFor="community"
                        value="Select community"
                        className="font-semibold"
                      />
                    </div>
                    <Select id="community" required name="communityId">
                      <option>Select Community</option>
                      {[].map((community) => (
                        <option value={community.id} key={community.id}>
                          {community.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div>
                  <div className="my-2 block">
                    <Label
                      className="font-semibold"
                      htmlFor="group"
                      value="Select farmer group"
                    />
                  </div>
                  <Select id="group" required className="w-full" name="groupId">
                    <option>group</option>
                    {[].map((group) => (
                      <option value={group.id} key={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <ActionBtn>Submit</ActionBtn>
              </section>
            </div>
          </fetcher.Form>
        </section>
      </div>
    </>
  );
};

export default FarmerForm;
