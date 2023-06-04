import axios from "axios";
import { useNavigate } from "react-router-dom";
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    const jwt = localStorage.getItem("jwt");
    config.headers = {
      Authorization: `${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      ...config.headers,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 403 || error.response.status === 401) {
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
