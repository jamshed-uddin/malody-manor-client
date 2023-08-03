import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const TableComponent = ({ columns, data }) => {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "left", mt: 3, mb: 3 }}
      >
        Selected Classes
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      ></DataGrid>
    </Box>
  );
};

export default TableComponent;
