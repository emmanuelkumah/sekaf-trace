import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AddUser, EditUser, Farmers, Farms, Landing, Users } from "./pages";
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
        element: <Farmers />,
      },
      {
        path: "farms",
        element: <Farms />,
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
