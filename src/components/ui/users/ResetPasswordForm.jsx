import { useState } from "react";
import BackButton from "../BackButton";
import { useFetcher, data, redirect } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import ActionBtn from "../SubmitBtn";
const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  let errors = fetcher.data?.errors;
  return (
    <div className="container mx-auto">
      <BackButton />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <fetcher.Form className="space-y-4" method="post">
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
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Old password
            </label>
            <TextInput
              type="text"
              id="oldPassword"
              name="oldPassword"
              defaultValue=""
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
              color={errors?.newPassword && "failure"}
            >
              New Password
            </label>
            <div className="relative">
              <TextInput
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                defaultValue=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors?.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword}
                </p>
              )}
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
            {errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="mt-4">
            <ActionBtn>{busy ? "submitting" : "submit"}</ActionBtn>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const allFormData = {
    email: formData.get("email"),
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };
  console.log(allFormData);
  const errors = {};
  if (!/[^A-Za-z0-9]/.test(allFormData.newPassword)) {
    errors.newPassword =
      "Password must include lowercase, uppercase, number, and special character";
  }

  if (!allFormData.email.includes("@")) {
    errors.email = "Invalid email address";
  }
  if (allFormData.newPassword !== allFormData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  return redirect("/app/users");
};
