import axios from "axios";

const API_URL = "http://localhost:8000/api/admin-register/";

const register = async (userData) => {
  const response = await axios
    .post(API_URL, userData)
    .then((res) => console.log("kk", res));

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios
    .post("http://localhost:8000/api/admin-login/", userData)
    .then((res) => console.log("Loginden gelen", res.data));;

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
