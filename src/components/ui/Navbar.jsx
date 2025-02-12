import React from "react";
import { Avatar, Dropdown, Button } from "flowbite-react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative  text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const { setActiveMenu } = useNavigationContext();
  const { logoutUser, user } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    const onLogout = logoutUser();
    if (onLogout) {
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="flex justify-between p-2 md:mx-6 relative">
        <NavButton
          color="red"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          icon={<AiOutlineMenu />}
        />
        <div>
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="" rounded />}
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Item>
              <Button className="w-full" onClick={handleLogOut}>
                Log out
              </Button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
