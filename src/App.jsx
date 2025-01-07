import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages";
import { HomeLayout, DashboardLayout } from "./components";
import { NavigationProvider } from "./context/NavigationContext";
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
        element: <h1>Users</h1>,
      },
      {
        path: "farmers",
        element: <h1>Farmers</h1>,
      },
      {
        path: "farms",
        element: <h1>Farms</h1>,
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
