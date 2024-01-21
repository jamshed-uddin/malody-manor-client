import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import SelectComp from "./SelectComp";
import axios from "axios";

const ManageClassActions = ({ params, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");

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

  console.log(status);

  const handleUpdate = (event) => {
    event.preventDefault();

    const updateStatusAndFeedback = {
      status: status,
      feedback: feedback || "",
    };

    console.log(updateStatusAndFeedback);

    try {
      if (!status) return;

      setLoading(true);
      axios
        .patch(
          `${import.meta.env.VITE_SERVER_URL}/updateStatus/${params?.row?._id}`,
          updateStatusAndFeedback
        )
        .then((result) => {
          console.log(result);
          if (result.data.modifiedCount) {
            setLoading(false);
            setSuccess(true);

            refetch();
          } else {
            refetch();

            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      refetch();
      handleClose();
      setLoading(false);
    }
    setTimeout(() => {
      setSuccess(false);
      handleClose();
      setFeedback("");
    }, 3000);
  };

  return (
    <div className="space-x-4">
      <SelectComp
        currentOption={params.row.status}
        options={["pending", "approved", "denied"]}
        setValue={setStatus}
      />
      {status === "denied" ? (
        <button
          className="border-2 border-black rounded-lg px-4 py-1  "
          onClick={handleOpen}
        >
          Feedback
        </button>
      ) : (
        <button
          type="button"
          disabled={!status || params.row.status === status}
          onClick={handleUpdate}
          className={`${
            !status || params.row.status === status
              ? "opacity-50 cursor-not-allowed"
              : ""
          } border-2  border-black rounded-lg px-3 py-1 relative ${
            success && "bg-green-500 border-green-500 text-white"
          }`}
        >
          {success ? (
            <span className="px-[6px]">Updated</span>
          ) : (
            <span>Update </span>
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
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <h1 className="text-xl font-semibold">Status: {status}</h1>
            <h1 className="text-xl font-semibold mb-3">Send feedback.</h1>
            <form onSubmit={handleUpdate}>
              <textarea
                name="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`block resize-none border-2 border-black rounded-xl p-2 font-semibold ${
                  theme === "black" && "bg-slate-900"
                }`}
                cols="40"
                rows="5"
                placeholder="Feedback"
                required
              ></textarea>
              <button
                className={` text-lg font-semibold border-2 mt-3 border-black px-2 mr-3 rounded-lg cursor-pointer  relative ${
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
                onClick={() => {
                  setFeedback("");
                  handleClose();
                }}
                className="text-red-500  font-semibold text-xl"
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
