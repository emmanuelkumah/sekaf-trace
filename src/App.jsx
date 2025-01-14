import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AddFarmer,
  AddUser,
  DisplayFarmActivities,
  EditFarmer,
  EditUser,
  Farmers,
  Farms,
  Landing,
  StartFarmActivity,
  SubmitPlantingActivity,
  SubmitPreplantingActivity,
  SubmitLandPreperationActivity,
  Users,
  SubmitWeedControlActivity,
} from "./pages";
import {
  HomeLayout,
  DashboardLayout,
  ResetPasswordForm,
  UpdateUserStatus,
} from "./components";
import { NavigationProvider } from "./context/NavigationContext";
import { action as addUserAction } from "./components/ui/users/AddUserForm";
import { action as resetPasswordAction } from "./components/ui/users/ResetPasswordForm";
import { action as updateUserAction } from "./components/ui/users/UpdateUserStatus";
import { action as mutatePrePlantingActivities } from "./components/ui/Activities/PrePlanting/PrePlantingForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <h1>Login screen</h1>,
      },
      {
        path: "register",
        element: <h1> Register screen</h1>,
      },
    ],
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <h1>Dashboard</h1>,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: "new-user",
            element: <AddUser />,
            action: addUserAction,
          },
          {
            path: ":id/edit-user",
            element: <EditUser />,
          },
          {
            path: ":id/reset-password",
            element: <ResetPasswordForm />,
            action: resetPasswordAction,
          },
          {
            path: ":id/update-status",
            element: <UpdateUserStatus />,
            action: updateUserAction,
          },
        ],
      },
      {
        path: "farmers",
        children: [
          {
            index: true,
            element: <Farmers />,
          },
          {
            path: "new",
            element: <AddFarmer />,
          },
          {
            path: ":id/edit",
            element: <EditFarmer />,
          },
        ],
      },
      {
        path: "farms",
        children: [
          {
            index: true,
            element: <Farms />,
          },
          {
            path: ":id/activity",
            children: [
              {
                index: true,
                element: <StartFarmActivity />,
              },
              {
                path: "pre-planting",
                element: <SubmitPreplantingActivity />,
                action: mutatePrePlantingActivities,
              },
              {
                path: "planting",
                element: <SubmitPlantingActivity />,
              },
              {
                path: "land-preparation",
                element: <SubmitLandPreperationActivity />,
              },
              {
                path: "harvesting",
                element: <h1>Harvesting screen</h1>,
              },
              {
                path: "weed-control",
                element: <SubmitWeedControlActivity />,
              },
              {
                path: "pest-control",
                element: <h1>Pest control</h1>,
              },
              {
                path: "fertilizing",
                element: <h1>Fertilizing screen</h1>,
              },
              {
                path: "storage",
                element: <h1>Storage</h1>,
              },
              {
                path: "sales",
                element: <h1>Sales</h1>,
              },
              {
                path: "shipment",
                element: <h1>Shipment</h1>,
              },
              {
                path: "transportation",
                element: <h1>Transportation</h1>,
              },
            ],
          },
          {
            path: ":id/viewActivities",
            element: <DisplayFarmActivities />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <NavigationProvider>
      <RouterProvider router={router} />
    </NavigationProvider>
  );
}

export default App;
