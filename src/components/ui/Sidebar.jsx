import { PiPottedPlantBold } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { links } from "../../utils/links";
import { useNavigationContext } from "../../context/NavigationContext";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, showSubMenu, setShowSubMenu } =
    useNavigationContext();

  const displaySubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const handleCloseMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const activeLink =
    "flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-xl text-primary text-md m-2 focus:bg-secondary";
  const normalLink =
    "flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-xl  text-md text-gray-700  hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center ">
            <Link
              to="/app"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <PiPottedPlantBold />
              <span>Reality Makers</span>
            </Link>
            <div>
              <button
                type="button"
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                onClick={handleCloseMenu}
              >
                <RiCloseLargeLine className="text-primary" />
              </button>
            </div>
          </div>
          <div className="mt-10">
            {links.map((menu) => (
              <div key={menu.name}>
                <NavLink
                  to={`/app/${menu.url}`}
                  onClick={menu.subMenu && displaySubMenu}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  end
                >
                  {menu.icon}
                  <span className="capitalize">{menu.name}</span>
                  <span onClick={() => setShowSubMenu(!showSubMenu)}>
                    {menu.subMenu && showSubMenu
                      ? menu.iconOpened
                      : menu.subMenu
                      ? menu.iconClose
                      : null}
                  </span>
                </NavLink>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
