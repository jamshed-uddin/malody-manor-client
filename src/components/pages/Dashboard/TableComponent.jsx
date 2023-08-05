import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const TableComponent = ({ columns, data }) => {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      ></DataGrid>
    </Box>
  );
};

export default TableComponent;
