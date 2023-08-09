import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
const [logOut] = useContext(AuthContext);
const navigate = useNavigate();

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
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
        if (
          error.response &&
          (error?.response.status === 401 || error?.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return [axiosSecure];
};

export default useAxiosSecure;
