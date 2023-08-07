import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, { useState } from "react";

const MyClassesActions = ({ params, setReload, notify }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputStyle =
    "block border-2  border-black rounded-xl p-2 font-semibold";

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

  const updataClassHandler = (event) => {
    event.preventDefault();
    const updatedInfo = {
      price: parseInt(event.target.price.value),
      available_seat: parseInt(event.target.availableSeat.value),
      description: event.target.description.value,
    };

    setLoading(true);
    fetch(`http://localhost:3000/updateClassInfo/${params.row._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          setLoading(false);
          setSuccess(true);
          setReload((prevReload) => !prevReload);
        } else {
          setLoading(false);
        }
      });
    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 4000);
  };
  // delete class function-------------
  const handleDeleteClass = (classId) => {
    fetch(`http://localhost:3000/deleteClass/${classId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount) {
          notify();
          setReload((prevReload) => !prevReload);
        }
      });
  };
  return (
    <div>
      {params.row.status === "denied" && (
        <button className="border-2 border-black px-2 rounded-lg text-lg mr-3">
          <FontAwesomeIcon icon={faCommentDots} />
        </button>
      )}
      <button
        onClick={handleOpen}
        className="border-2 border-black px-2 rounded-lg text-lg mr-3"
      >
        Update
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <h1 className="text-xl font-bold mb-3">Update class info</h1>
            <form onSubmit={updataClassHandler}>
              <label htmlFor="className" className="text-lg font-semibold">
                Class name
              </label>
              <input
                className={inputStyle}
                type="text"
                defaultValue={params.row.class_name}
                id="className"
                name="className"
                readOnly
              />
              <label htmlFor="price" className="text-lg font-semibold">
                Price($)
              </label>
              <input
                id="price"
                className={inputStyle}
                type="text"
                defaultValue={params.row.price}
                name="price"
                placeholder="Price"
                required
              />
              <label htmlFor="availableSeat" className="text-lg font-semibold">
                Available seat
              </label>
              <input
                id="availableSeat"
                className={inputStyle}
                type="text"
                defaultValue={params.row.available_seat}
                name="availableSeat"
                placeholder="Available seat"
                required
              />

              <label htmlFor="description" className="text-lg font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className={`text-base resize-none ${inputStyle}`}
                cols="40"
                rows="5"
                placeholder="description"
                defaultValue={params.row.description && params.row.description}
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
                className=" text-lg font-semibold border-2 mt-3  px-3 border-red-400 rounded-xl cursor-pointer bg-red-400  text-white"
                type="button"
              >
                Cancel
              </button>
            </form>
          </div>
        </Box>
      </Modal>
      <button
        onClick={() => handleDeleteClass(params.row._id)}
        className="border-2  px-2 rounded-lg text-lg bg-red-500 text-white border-red-500 "
      >
        Delete
      </button>
    </div>
  );
};

export default MyClassesActions;
