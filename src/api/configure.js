import axios from "axios";

export const instance_v1 = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? "https://eloquent-noyce-68a4a8.netlify.app/v1.9"
      : "http://localhost:3000/v1.9",
  headers: {
    "X-Device-Token": localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token"),
  },
});

export const instance_v2 = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? "https://eloquent-noyce-68a4a8.netlify.app/v2.1"
      : "http://localhost:3000/v2.1",
  headers: {
    "X-Device-Token": localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token"),
  },
});
