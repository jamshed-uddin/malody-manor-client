import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

const ManageClassActions = ({ params, rowId, setRowId }) => {
  //   console.log(params);
  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 10,
    borderRadius: 3,
    p: 4,
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;
    const updateStatusAndFeedback = { status: params.row.status, feedback };

    console.log(updateStatusAndFeedback);
    // console.log(feedback, params.row._id, params.row.status);

    fetch(`http://localhost:3000/updateStatus/${params?.row?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateStatusAndFeedback),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          handleClose();
        }
      });

    // handleOpen();
  };

  return (
    <div>
      <Button onClick={handleOpen}>next</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <h1 className="text-xl font-bold">Status: {params.row.status}</h1>
            <h1 className="text-xl font-bold mb-3">Send feedback.</h1>
            <form onSubmit={handleUpdate}>
              <textarea
                name="feedback"
                className="block resize-none border-2 border-black rounded-xl p-2 font-semibold"
                cols="40"
                rows="5"
                placeholder="Feedback"
              ></textarea>
              <input
                className=" text-lg font-semibold border-2 mt-3 border-black px-2 mr-3 rounded-xl cursor-pointer hover:bg-gray-100"
                type="submit"
                value="Update"
              />
              <button
                onClick={handleClose}
                className=" text-lg font-semibold border-2 mt-3 border-black px-2 rounded-xl cursor-pointer hover:bg-red-400"
                type="button"
              >
                Cancel
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageClassActions;
