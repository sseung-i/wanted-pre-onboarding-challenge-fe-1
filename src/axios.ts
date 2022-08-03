import axios from "axios";

const myserver = axios.create({
  baseURL: "http://localhost:8080",
});

export default myserver;
