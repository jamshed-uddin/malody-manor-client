import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { CircularProgress, unstable_ClassNameGenerator } from "@mui/material";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import uplaodPhotoToCloud from "../../../shared/uploadPhotoToCloud";
import deletePhotoFromCloud from "../../../shared/deletePhotoFromCloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRole from "../../../../Hooks/useRole";

const initialState = {
  className: "",
  description: "",
  photoURL: "",
  instructorEmail: "",
  instructorName: "",
  price: "",
  availableSeats: "",
  lessons: [""],
  enrolled: 0,
  status: "pending",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TEXT_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "ADD_LESSONS":
      return {
        ...state,
        [action.name]: [...state[action.name], ""],
      };
    case "REMOVE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (_, index) => index !== action.index
        ),
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: state[action.name].map((value, index) =>
          index === action.index ? action.value : value
        ),
      };
  }
};

const AddClass = () => {
  const { currentUser } = useRole();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const [formState, dispatch] = useReducer(reducer, initialState);

  console.log(previewImage);
  console.log(formState);

  useEffect(() => {
    if (!editMode) {
      dispatch({
        type: "TEXT_INPUT",
        name: "instructorName",
        value: currentUser?.name,
      });
      dispatch({
        type: "TEXT_INPUT",
        name: "instructorEmail",
        value: currentUser?.email,
      });
    }
  }, [currentUser, editMode]);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    const imageBlobURL = URL.createObjectURL(file);
    setPreviewImage(imageBlobURL);
    console.log(imageBlobURL);

    try {
      setPhotoUploading(true);
      await uplaodPhotoToCloud(file).then((result) => {
        console.log(result);
        dispatch({
          type: "TEXT_INPUT",
          name: "photoURL",
          value: result?.secure_url,
        });
        setPhotoUploading(false);
      });
    } catch (error) {
      console.log(error);
      setPhotoUploading(false);
    }
  };

  const deleteImageHandler = async () => {
    console.log("hello");
    setPreviewImage("");

    try {
      await deletePhotoFromCloud(formState.photoURL).then((result) =>
        console.log(result)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // data submit for create a new class
  const handleClassSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/addNewClass`, formState)

        .then((result) => {
          if (result.data.insertedId) {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              reset();
            }, 1500);
          } else {
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
    }
    // --------------

    setTimeout(() => {
      setSuccess(false);
      navigate("/dashboard/my-classes");
    }, 4000);
  };

  // styles for input and label
  const labelStyle = "block  ml-1 font-semibold mb-1";
  const inputStyle = `border border-gray-400 p-2 w-full rounded-xl focus:outline-none ${
    theme === "black" && "bg-slate-900"
  }`;
  // --------

  return (
    <div>
      <Helmet>
        <title>Dashboard - add classes</title>
      </Helmet>
      <div>
        <h1 className="pb-4 text-2xl">Add class</h1>
      </div>
      <form onSubmit={handleClassSubmit}>
        <div className="space-y-3">
          <div
            className={`mb-2 ${
              previewImage ? "" : "border-[1px] border-gray-400"
            } rounded-xl w-full mx-auto h-60 md:h-80 flex items-center justify-center overflow-hidden select-none relative`}
          >
            <div className={`${!previewImage && "hidden"}`}>
              <img
                className={`w-full h-full object-cover `}
                src={previewImage}
                alt=""
                draggable="false"
              />
              <button
                disabled={photoUploading}
                onClick={deleteImageHandler}
                type="button"
                className={`absolute bottom-3 left-3 bg-bgColor text-colorOne rounded-full flex items-center p-[2px] cursor-pointer text-gray-500  text-xl bg-white  ${
                  photoUploading ? "opacity-50" : "opacity-100"
                }`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <label
              className={`w-full h-full text-center flex flex-col justify-center items-center leading-3 text-lg font-semibold ${
                previewImage && "hidden"
              }`}
              htmlFor="image"
            >
              {/* <CameraAltOutlinedIcon /> */}
              <span className="mt-1"> Add photo</span>
            </label>
            <input
              className="hidden"
              id="image"
              name="image"
              type="file"
              onChange={imageHandler}
            />
          </div>
        </div>
        <div className="mb-2 flex-grow">
          <label htmlFor="className" className={labelStyle}>
            Class name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            className={inputStyle}
            required
            onChange={(e) => {
              dispatch({
                type: "TEXT_INPUT",
                name: e.target.name,
                value: e.target.value,
              });
            }}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className={` border border-gray-400 focus:outline-none p-2 w-full rounded-xl ${
              theme === "black" && "bg-slate-900"
            }`}
            onChange={(e) => {
              dispatch({
                type: "TEXT_INPUT",
                name: e.target.name,
                value: e.target.value,
              });
            }}
          />
        </div>

        <div className="lg:flex gap-4">
          <div className="mb-2 flex-grow">
            <label htmlFor="price" className={labelStyle}>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              className={inputStyle}
              required
              onChange={(e) => {
                dispatch({
                  type: "TEXT_INPUT",
                  name: e.target.name,
                  value: e.target.value,
                });
              }}
            />
          </div>

          <div className="mb-2 flex-grow">
            <label htmlFor="availableSeats" className={labelStyle}>
              Available seats
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              min="0"
              className={inputStyle}
              required
              onChange={(e) => {
                dispatch({
                  type: "TEXT_INPUT",
                  name: e.target.name,
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-end">
            <h4 className={labelStyle}>Lessons</h4>
          </div>
          <div>
            {formState.lessons.map((lesson, index) => (
              <div key={index} className={`relative mb-2 `}>
                <input
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      name: e.target.name,
                      value: e.target.value,
                      index,
                    })
                  }
                  className={inputStyle}
                  type="text"
                  value={lesson}
                  name="lessons"
                  placeholder="Add a lesson"
                  key={`lesson-${index}`}
                />
                {/* btn for removing ingredient field */}
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FIELD",
                      name: "lessons",
                      index,
                    })
                  }
                  className="absolute top-2 right-1 opacity-50 hover:opacity-100 "
                  disabled={formState.lessons.length === 1}
                >
                  remove
                </button>
              </div>
            ))}
          </div>

          {/* button for adding  new ingredient field */}
          <button
            className="  border-[1px] border-black px-3 py-1 rounded-xl "
            type="button"
            onClick={() => dispatch({ type: "ADD_LESSONS", name: "lessons" })}
          >
            Add Lesson
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            disabled={photoUploading}
            type="submit"
            className={`text-xl font-semibold border-2 border-black px-3 py-1 rounded-xl w-1/2 relative ${
              success && "bg-green-400 border-green-400"
            } ${theme === "black" && "bg-slate-900"}`}
          >
            {success ? (
              <span className="px-[6px]">Added the class</span>
            ) : (
              <span>Add class</span>
            )}
            <span>
              {loading && (
                <CircularProgress
                  size={20}
                  sx={{
                    position: "absolute",
                    left: "50%",

                    right: "50%",
                  }}
                />
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
