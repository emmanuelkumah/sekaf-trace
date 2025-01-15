import React from "react";
import { Label, Radio, Button } from "flowbite-react";
import { useFetcher, data, redirect } from "react-router-dom";

import BackButton from "../BackButton";
import ActionBtn from "../SubmitBtn";
const UpdateUserStatus = () => {
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  let errors = fetcher.data?.errors;
  return (
    <>
      <div className="container mx-auto">
        <BackButton />
        <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <fetcher.Form method="patch">
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">Update User status</legend>
              <div className="flex items-center gap-2">
                <Radio id="enable-user" name="active" value="Yes" />
                <Label htmlFor="enable-user">Enable user</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="disable-user"
                  name="active"
                  value="No"
                  defaultChecked
                />
                <Label htmlFor="diasble-user">Disable user</Label>
              </div>
            </fieldset>
            <ActionBtn>{busy ? "submitting" : "submit"}</ActionBtn>
          </fetcher.Form>
        </section>
      </div>
    </>
  );
};

export default UpdateUserStatus;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const userId = parseInt(params.id);
  const convertToBoolean = () => {
    if (data.get("active") === "No") return false;
    return true;
  };
  const status = {
    active: convertToBoolean(),
  };
};
