import React from "react";
import useAxiosLoader from "../../services/http";
import { Box } from "@mui/material";

const Spinner = () => <div className="spinner"></div>;

function Loader() {
  const [loading] = useAxiosLoader();

  return (
    <>
      {loading && (
        <Box className="overlay">
          <Spinner />
          <img
            style={{
              borderRadius: "50%",
            }}
            className="spinner-image"
            src="assets\images\Logo2.jpg"
            alt=""
          />
        </Box>
      )}
    </>
  );
}

export default Loader;
