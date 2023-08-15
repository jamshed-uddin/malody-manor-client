import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const ManageClassActions = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style =
    theme === "black"
      ? {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "#000",
          border: "2px solid #000",
          boxShadow: 10,
          borderRadius: 3,
          p: 4,
        }
      : {
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
    // console.log(updateStatusAndFeedback);

    setLoading(true);
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/updateStatus/${params?.row?._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateStatusAndFeedback),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          setLoading(false);
          setSuccess(true);
        } else {
          setLoading(false);
        }
      });

    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 4000);
  };

  return (
    <div>
      <button
        className="border-2 border-black rounded-full px-4 py-1  "
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <h1 className="text-xl font-semibold">
              Status: {params.row.status}
            </h1>
            <h1 className="text-xl font-semibold mb-3">Send feedback.</h1>
            <form onSubmit={handleUpdate}>
              <textarea
                name="feedback"
                className={`block resize-none border-2 border-black rounded-xl p-2 font-semibold ${
                  theme === "black" && "bg-slate-900"
                }`}
                cols="40"
                rows="5"
                placeholder="Feedback"
                required
              ></textarea>
              <button
                className={` text-lg font-semibold border-2 mt-3 border-black px-2 mr-3 rounded-xl cursor-pointer hover:bg-gray-100 relative ${
                  success && "bg-green-500 border-green-500 text-white"
                }`}
                type="submit"
                value="Update"
              >
                {success ? (
                  <span className="px-[6px]">Updated</span>
                ) : (
                  <span>Update</span>
                )}
                <span>
                  {loading && (
                    <CircularProgress
                      size={20}
                      sx={{
                        position: "absolute",
                        left: "40%",
                      }}
                    />
                  )}
                </span>
              </button>

              <button
                onClick={handleClose}
                className=" text-lg font-semibold border-2 mt-3 border-black px-2 rounded-xl cursor-pointer hover:bg-red-400 hover:border-white hover:text-white"
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
