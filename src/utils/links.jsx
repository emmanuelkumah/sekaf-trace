import { PiPottedPlantBold, PiPottedPlantDuotone } from "react-icons/pi";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";

export const links = [
  {
    name: "Dashboard",
    icon: <PiPottedPlantBold />,
    iconClose: <MdKeyboardArrowDown />,
    iconOpened: <MdOutlineKeyboardArrowUp />,
    url: "#",
  },
  {
    name: "Users",
    icon: <FaUsers />,
    iconClose: <MdKeyboardArrowDown />,
    iconOpened: <MdOutlineKeyboardArrowUp />,
    url: "users",
  },

  {
    name: "Farmers",
    icon: <FaUsersLine />,
    iconClose: <MdKeyboardArrowDown />,
    iconOpened: <MdOutlineKeyboardArrowUp />,
    url: "farmers",
  },

  {
    name: "Farms",
    icon: <PiPottedPlantDuotone />,
    iconClose: <MdKeyboardArrowDown />,
    iconOpened: <MdOutlineKeyboardArrowUp />,
    url: "farms",
  },
];
