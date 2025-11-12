import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_HOST,
});

export default api;
