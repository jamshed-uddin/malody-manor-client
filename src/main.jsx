import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/pages/Home/Home/Home.jsx";
import Instructors from "./components/pages/Instructors/Instructors.jsx";
import Classes from "./components/pages/Classes/Classes.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Register from "./components/pages/Registration/Register.jsx";
import AuthProvider from "./components/Provider/AuthProvider.jsx";
import Dashboard from "./components/pages/Dashboard/Dashboard.jsx";
import Profile from "./components/pages/Dashboard/UserHome.jsx";
import ManageUsers from "./components/pages/Dashboard/Admin/ManageUsers.jsx";
import ManageClasses from "./components/pages/Dashboard/Admin/ManageClasses.jsx";
import UserHome from "./components/pages/Dashboard/UserHome.jsx";
import SelectedClasses from "./components/pages/Dashboard/Student/SelectedClasses.jsx";
import EnrolledClasses from "./components/pages/Dashboard/Student/EnrolledClasses.jsx";
import PaymentHistory from "./components/pages/Dashboard/Student/PaymentHistory.jsx";
import AddClass from "./components/pages/Dashboard/Instructor/AddClass.jsx";
import MyClasses from "./components/pages/Dashboard/Instructor/MyClasses.jsx";
import Payment from "./components/pages/Dashboard/Payment.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },
      //admin routes
      {
        path: "manage-user",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manage-classes",
        element: <ManageClasses></ManageClasses>,
      },
      //student routes
      {
        path: "selected-classes",
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment/:classId",
        element: <Payment></Payment>,
      },
      //instructor routes
      {
        path: "add-class",
        element: <AddClass></AddClass>,
      },
      {
        path: "my-classes",
        element: <MyClasses></MyClasses>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
