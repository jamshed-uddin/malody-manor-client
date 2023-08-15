import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

const TableComponent = ({ columns, data }) => {
  const { theme } = useContext(ThemeContext);
  const lightStyle = { backgroundColor: "black", color: "white" };
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        sx={theme === "black" && lightStyle}
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      ></DataGrid>
    </Box>
  );
};

export default TableComponent;
