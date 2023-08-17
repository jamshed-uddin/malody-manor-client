import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

const TableComponent = ({ columns, data }) => {
  const { theme } = useContext(ThemeContext);
  const rowStyle = {
    backgroundColor: theme === "black" ? "black" : "white",
    color: theme === "black" ? "white" : "black",
  };
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        sx={rowStyle}
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      ></DataGrid>
    </Box>
  );
};

export default TableComponent;
