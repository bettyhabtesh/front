/** @format */

import axios from "axios";

// Set your backend URL
const BASE_URL = "https://wheat-rust-detection-backend.onrender.com/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      email,
      password,
    });

    // If login is successful, store the token in localStorage
    if (response.data && response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Invalid response from server" };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};
