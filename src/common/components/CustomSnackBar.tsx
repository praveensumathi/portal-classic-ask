import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSnackBar } from "../../context/SnackBarContext";
import { ISnackBarContextType } from "../../interface/types";

function CustomSnackBar() {
  const { snackBarState } = useSnackBar() as ISnackBarContextType;

  useEffect(() => {
    if (snackBarState && snackBarState.snackbarOpen) {
      if (snackBarState.snackbarSeverity == "success") {
        toast.success(snackBarState.snackbarMessage, {});
      } else if (snackBarState.snackbarSeverity == "error") {
        toast.error(snackBarState.snackbarMessage);
      }
    }
  }, [snackBarState]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}

export default CustomSnackBar;
