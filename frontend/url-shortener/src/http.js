import axios from "axios";

// base api url of backend server
export default axios.create({
  baseURL: "http://localhost:8080/api/urlshortener",
  headers: {
    "Content-type": "application/json"
  }
});