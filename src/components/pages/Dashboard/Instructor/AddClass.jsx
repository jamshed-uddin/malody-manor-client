import React, { useContext, useEffect, useReducer, useState } from "react";

import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../../Provider/ThemeProvider";
import uplaodPhotoToCloud from "../../../shared/uploadPhotoToCloud";
import deletePhotoFromCloud from "../../../shared/deletePhotoFromCloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useRole from "../../../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";

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
    case "CLASS_FOR_EDIT":
      return {
        ...state,
        ...action.classForEdit,
      };

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
  const { theme } = useContext(ThemeContext);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { classId } = useParams();

  console.log(previewImage);
  console.log(formState);

  // using the add recipe form for editing recipe ..
  const { isLoading, data, error } = useQuery(
    ["classDetail"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/singleClass/${classId}`
      );
      return result.data;
    },
    { enabled: !!classId } //query only enables when id is true or there is a id(id that comes in params)
  );
  console.log(isLoading);

  useEffect(() => {
    if (data) {
      setEditMode(true);
      // setting entire recipe data for edit to initial state
      dispatch({ type: "CLASS_FOR_EDIT", classForEdit: data });
      // getting publicId part from url and setting it to public_id state.it requires for deleting image from cloudinary
      if (data.photoURL) {
        setPreviewImage(data.photoURL);
      }
    }
  }, [data]);

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
      if (editMode) {
        await axios
          .put(
            `${import.meta.env.VITE_SERVER_URL}/updateClassInfo/${classId}`,
            formState
          )

          .then((result) => {
            console.log(result);
            if (result.data.modifiedCount || result.data) {
              setLoading(false);

              navigate("/dashboard/my-classes");
            } else {
              setLoading(false);
            }
          });
      } else {
        await axios
          .post(`${import.meta.env.VITE_SERVER_URL}/addNewClass`, formState)

          .then((result) => {
            if (result.data.insertedId) {
              setLoading(false);

              navigate("/dashboard/my-classes");
            } else {
              setLoading(false);
            }
          });
      }
    } catch (error) {
      setLoading(false);
    }
    // --------------
  };

  // styles for input and label
  const labelStyle = "block  ml-1 font-semibold mb-1";
  const inputStyle = `border border-gray-400 p-2 w-full rounded-xl focus:outline-none ${
    theme === "black" && "bg-slate-900"
  }`;
  // --------

  return (
    <div className="pb-8">
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
            } rounded-xl lg:w-3/5 mx-auto h-60 md:h-80 flex items-center justify-center overflow-hidden select-none relative`}
          >
            <div className={` ${!previewImage && "hidden"}`}>
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
                className={`absolute bottom-3 left-3 bg-bgColor text-colorOne rounded-full flex items-center px-[6px] py-[5px] cursor-pointer text-gray-500  text-xl bg-white  ${
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
            value={formState.className}
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
            value={formState.description}
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
              value={formState.price}
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
              value={formState.availableSeats}
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
            className={`text-xl font-semibold px-3 py-1 rounded-xl  relative ${
              theme === "black"
                ? " border-2 border-white"
                : "border-2 border-black"
            }`}
          >
            {editMode ? (
              <span className="px-[6px]">Update class</span>
            ) : (
              <span>Add class</span>
            )}
            <span className="absolute left-1/2 top-1/2 -translate-y-1/2">
              {loading && <CircularProgress size={25} />}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
