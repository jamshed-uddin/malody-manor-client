import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userLogOut);
  useEffect(() => {
    axiosSecure.interceptors.request.use((req) => {
      //try

      //catch

      const token = localStorage.getItem("access-token");

      if (token) {
        req.headers.authorization = `bearer ${token}`;
      }
      return req;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error);
        if (
          error.response &&
          (error?.response.status === 401 || error?.response.status === 403)
        ) {
          await userLogOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [userLogOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
