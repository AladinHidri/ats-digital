import axios from "axios";

var axiosInstance;

let generateAxiosInstance = () => {
  axiosInstance = axios.create({
    baseURL: `http://127.0.0.1:5000/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { axiosInstance, generateAxiosInstance };
