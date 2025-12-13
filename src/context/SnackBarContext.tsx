import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import { ISnackBarContextType } from "../interface/types";

const SnackBarContext = createContext<ISnackBarContextType>({
  snackBarState: {
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
  },
  updateSnackBarState: () => {},
});

function SnackBarProvider({ children }) {
  const [snackBarState, setSnackBarstate] = useState({
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
  });

  const updateSnackBarState = (
    isOpen: boolean,
    message: string,
    severity: string
  ) => {
    var obj = {
      snackbarOpen: isOpen,
      snackbarMessage: message,
      snackbarSeverity: severity,
    };
    setSnackBarstate({ ...obj });
  };

  const contextValue: ISnackBarContextType = {
    snackBarState,
    updateSnackBarState,
  };

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
    </SnackBarContext.Provider>
  );
}
export function useSnackBar() {
  const context = useContext<ISnackBarContextType>(SnackBarContext);
  return context;
}

export default SnackBarProvider;
