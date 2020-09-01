import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "jwttoken"
);

export default instance;
