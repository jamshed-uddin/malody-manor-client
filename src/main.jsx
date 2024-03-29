import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/pages/Home/Home/Home.jsx";

import Classes from "./components/pages/Classes/Classes.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Register from "./components/pages/Registration/Register.jsx";
import AuthProvider from "./components/Provider/AuthProvider.jsx";
import Dashboard from "./components/pages/Dashboard/Dashboard.jsx";
import ManageUsers from "./components/pages/Dashboard/Admin/ManageUsers.jsx";
import ManageClasses from "./components/pages/Dashboard/Admin/ManageClasses.jsx";
import UserHome from "./components/pages/Dashboard/UserHome.jsx";
import SelectedClasses from "./components/pages/Dashboard/Student/SelectedClasses.jsx";
import EnrolledClasses from "./components/pages/Dashboard/Student/EnrolledClasses.jsx";
import PaymentHistory from "./components/pages/Dashboard/Student/PaymentHistory.jsx";
import AddClass from "./components/pages/Dashboard/Instructor/AddClass.jsx";
import MyClasses from "./components/pages/Dashboard/Instructor/MyClasses.jsx";
import Payment from "./components/pages/Dashboard/Payment.jsx";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute.jsx";
import AdminRoute from "./components/PrivateRoutes/AdminRoute.jsx";
import InstructorRoute from "./components/PrivateRoutes/InstructorRoute.jsx";
import ThemeProvider from "./components/Provider/ThemeProvider.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import ClassDetail from "./components/pages/ClassDetail/ClassDetail.jsx";
import ScrollTop from "./ScrollTop.jsx";
import EventSignup from "./components/pages/EventSignup/EventSignup.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <App></App>
      </>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "class/:classId",
        element: <ClassDetail></ClassDetail>,
      },
      {
        path: "event-signup",
        element: <EventSignup></EventSignup>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "register",
    element: <Register></Register>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "user-home",
        element: (
          <PrivateRoute>
            <UserHome></UserHome>
          </PrivateRoute>
        ),
      },
      //admin routes
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
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
        path: "payment/:selectedClassId",
        element: <Payment></Payment>,
      },
      //instructor routes
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "editClass/:classId",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
