import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AddUser, Farmers, Farms, Landing, Users } from "./pages";
import { HomeLayout, DashboardLayout } from "./components";
import { NavigationProvider } from "./context/NavigationContext";
import { action as addUserAction } from "./components/ui/AddUserForm";

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
