import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import { ISnackBarContextType } from "../interface/types";

export const enum DrawerEnum {
  Navbar = 1,
  MyBag,
  Search,
}

const DrawerContext = createContext({
  drawerState: {
    isMyBagDrawerOpen: false,
    isNaveBarDraweOpen: false,
    isSearchDraweOpen: false,
  },
  updateDrawerState: (barName: DrawerEnum = DrawerEnum.Navbar) => {},
});

function DrawerProvider({ children }) {
  const [drawerState, setDrawerState] = useState({
    isMyBagDrawerOpen: false,
    isNaveBarDraweOpen: false,
    isSearchDraweOpen: false,
  });

  const updateDrawerState = (barName: DrawerEnum = DrawerEnum.Navbar) => {
    switch (barName) {
      case DrawerEnum.Navbar:
        setDrawerState({
          ...drawerState,
          isNaveBarDraweOpen: !drawerState.isNaveBarDraweOpen,
        });
        break;
      case DrawerEnum.MyBag:
        setDrawerState({
          ...drawerState,
          isMyBagDrawerOpen: !drawerState.isMyBagDrawerOpen,
        });
        break;
      case DrawerEnum.Search:
        setDrawerState({
          ...drawerState,
          isSearchDraweOpen: !drawerState.isSearchDraweOpen,
        });
        break;
      default:
        break;
    }
  };

  const contextValue = {
    updateDrawerState,
    drawerState,
  };
  return (
    <DrawerContext.Provider value={contextValue as any}>
      {children}
    </DrawerContext.Provider>
  );
}
export function useDrawer() {
  const context = useContext(DrawerContext);
  return context;
}

export default DrawerProvider;
