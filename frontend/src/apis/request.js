import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
const authRequest = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});
export { request, authRequest };
