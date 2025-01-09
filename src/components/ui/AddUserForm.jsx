import React, { useState } from "react";
import { TextInput, Alert, Datepicker, Select } from "flowbite-react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useFetcher, data, redirect } from "react-router-dom";
import validateUserForm from "../../utils/validateUserForm";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import BackButton from "./BackButton";
// import { Form } from "react-router-dom";
const AddUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  let errors = fetcher.data?.errors;

  return (
    <div className="container mx-auto">
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <fetcher.Form className="space-y-4" method="post">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <TextInput
                type="text"
                id="firstName"
                name="firstName"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <TextInput
                type="text"
                id="lastName"
                name="lastName"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <TextInput
                type="text"
                id="phone"
                name="phone"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors?.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  defaultValue=""
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaRegEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <PasswordStrengthIndicator password={"test"} />
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <TextInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {/* {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )} */}
            </div>
            <section>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select User role
              </label>
              <Select
                onChange={() => console.log("role change")}
                defaultValue="Tet"
                name="userRole"
              >
                <option value="">Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="FARM_AGENT">Farm agent</option>
                <option value="REPORTER">Reporter</option>
                <option value="VIEWER">Viewer</option>
                <option value="EXPORTER ">Exporter</option>
              </Select>
            </section>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-secondary hover:text-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
              >
                {busy ? "submitting" : "submit"}
              </button>
            </div>
          </fetcher.Form>
          {/* {Object.keys(errors).length > 0 && (
            <Alert className="mt-4" color="failure" icon={HiInformationCircle}>
              <span>
                Please correct the errors in the form before submitting.
              </span>
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const userFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    passsword: formData.get("password"),
  };
  console.log(userFormData);
  const errors = {};
  // if (!userFormData.email.includes("@")) {
  //   errors.email = "Invalid email address";
  // }
  // if (userFormData.password.length < 6) {
  //   errors.password = "Password must be at least 6 characters long";
  // }
  // if (Object.keys(errors).length > 0) {
  //   return data({ errors }, { status: 400 });
  // }

  return redirect("/app/users");
};
