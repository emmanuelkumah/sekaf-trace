import React, { useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useFetcher, data, redirect } from "react-router-dom";
import BackButton from "../BackButton";
import SubmitBtn from "../SubmitBtn";
import { validateAddUserData } from "../../../validate/validateFormData";
import { apiCalls } from "../../../api/axios";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { toast } from "react-toastify";

const AddUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fetcher = useFetcher();

  let errors = fetcher.data?.errors;
  console.log(errors);

  return (
    <div className="container mx-auto">
      <BackButton />
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-900 py-4">
            Add User
          </h2>
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
                color={errors?.firstName && "failure"}
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <TextInput
                type="text"
                id="lastName"
                name="lastName"
                color={errors?.lastName && "failure"}
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
                color={errors?.phone && "failure"}
              >
                Phone
              </label>
              <TextInput
                type="text"
                id="phone"
                name="phone"
                defaultValue=""
                color={errors?.phone && "failure"}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                color={errors?.email && "failure"}
              >
                Email
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                color={errors?.email && "failure"}
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                color={errors?.password && "failure"}
              >
                Password
              </label>
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  color={errors?.password && "failure"}
                  defaultValue=""
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
                color={errors?.confirmPassword && "failure"}
              >
                Confirm Password
              </label>
              <TextInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                color={errors?.confirmPassword && "failure"}
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors?.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <section>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select User role
              </label>
              <Select defaultValue="" name="userRole">
                <option value="">Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="FARM_AGENT">Farm agent</option>
                <option value="REPORTER">Reporter</option>
                <option value="VIEWER">Viewer</option>
                <option value="EXPORTER ">Exporter</option>
              </Select>
              {errors?.userRole && (
                <p className="mt-1 text-sm text-red-600">{errors.userRole}</p>
              )}
            </section>
            <SubmitBtn />
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const phoneNumber = formatPhoneNumber(formData.get("phone"));

  const userFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: phoneNumber,
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    userRole: formData.get("userRole"),
  };
  // Validate user data before saving it to the database
  const errors = validateAddUserData(userFormData);

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  try {
    const response = await apiCalls.createUser(userFormData);
    console.log(response);
    toast.success("User added successfully!");

    return redirect("/app/users");
  } catch (error) {
    console.log(error);
  }
};
