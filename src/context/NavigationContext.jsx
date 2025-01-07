import { useContext, useState, createContext } from "react";

const NavigationContext = createContext({});

export function NavigationProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [showSubMenu, setShowSubMenu] = useState(true);
  const value = {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    showSubMenu,
    setShowSubMenu,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigationContext = () => useContext(NavigationContext);
