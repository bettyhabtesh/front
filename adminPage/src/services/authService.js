// services/authService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// Set default Authorization header
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      email,
      password,
    });

    return {
      access: response.data.access_token,
      refresh: response.data.refresh_token,
    };
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Add try-catch to fetchUsers
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // 👈 get token from localStorage
    const response = await axios.get(`${BASE_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 include token here
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error.response?.data || error.message);
    throw error;
  }
};
