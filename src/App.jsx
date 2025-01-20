import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  Login,
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
  SubmitFertilizingActivity,
  SubmitPestControlActivity,
} from "./pages";
import {
  HomeLayout,
  DashboardLayout,
  ResetPasswordForm,
  UpdateUserStatus,
} from "./components";
import { NavigationProvider } from "./context/NavigationContext";
import AuthProvider from "./context/AuthContext";
import { action as addUserAction } from "./components/ui/users/AddUserForm";
import { action as resetPasswordAction } from "./components/ui/users/ResetPasswordForm";
import { action as updateUserAction } from "./components/ui/users/UpdateUserStatus";
import { action as mutatePrePlantingActivities } from "./components/ui/Activities/PrePlanting/PrePlantingForm";
import { action as mutateWeedControlActivities } from "./components/ui/Activities/WeedControl/WeedControlForm";
import { action as mutateLandPreparationActivities } from "./components/ui/Activities/LandPreparation/LandPreparationForm";
import { action as mutatePlantingActivities } from "./components/ui/Activities/Planting/PlantingForm";

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
        element: <Login />,
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
                action: mutatePlantingActivities,
              },
              {
                path: "land-preparation",
                element: <SubmitLandPreperationActivity />,
                action: mutateLandPreparationActivities,
              },
              {
                path: "harvesting",
                element: "Submit harvesting activity",
              },
              {
                path: "weed-control",
                element: <SubmitWeedControlActivity />,
                action: mutateWeedControlActivities,
              },
              {
                path: "pest-control",
                element: <SubmitPestControlActivity />,
              },
              {
                path: "fertilizing",
                element: <SubmitFertilizingActivity />,
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NavigationProvider>
  );
}

export default App;
