import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const CircularLoader: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CircularProgress color="primary" size={30} />
    </div>
  );
};

export default CircularLoader;