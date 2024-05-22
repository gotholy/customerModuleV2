import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Credentials": true
    },
    withCredentials: true
});