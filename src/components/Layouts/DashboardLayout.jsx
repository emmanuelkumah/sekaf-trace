import { useNavigationContext } from "../../context/NavigationContext";
import { Sidebar, Navbar } from "..";
import { Outlet, Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const { activeMenu, setActiveMenu } = useNavigationContext();

  return (
    <>
      <section className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 z-40 fixed sidebar bg-red-50">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0  bg-white">
            <Sidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed z-40 md:static bg-accent  navbar w-full">
            <Navbar />
          </div>
          <Outlet />
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default DashboardLayout;
