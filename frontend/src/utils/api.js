import axios from "axios";
import { API_URI } from "./config.js";

const api = axios.create({
    baseURL: API_URI,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Credentials": true
    },
    withCredentials: true
});

export default api;