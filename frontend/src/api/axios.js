import axios from "axios";

const base_url = "https://cravex-a-food-app-backend.onrender.com";
//const base_url = "http://localhost:3200";

const axiosPrivate = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

export default axiosPrivate;
