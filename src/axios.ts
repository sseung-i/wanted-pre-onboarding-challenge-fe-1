import axios from "axios";

const token = localStorage.getItem("token");

const myserver = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `${token}`,
  },
});

export default myserver;
