import axios from "axios";
import { store } from "../redux-toolkit/store";

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  //   timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptors (optional)
apiHandler.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    // const token = state.auth.token; // Replace with logic to retrieve the token

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptors (optional)
apiHandler.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    // if (error.response?.status === 401) {
    //     // Handle unauthorized errors (e.g., redirect to login)
    // }
    if (error.response?.status === 409 || error.response?.status === 401) {
      // logout user and redirect to login page
      // const elem = document.getElementById("logoutUser");

      // if (elem) {
      //   elem.click();
      // }
    }
    return Promise.reject(error);
  },
);

export default apiHandler;
