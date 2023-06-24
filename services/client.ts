import axios from "axios";
import { getToken } from "./auth.service";

const client = axios.create({
    baseURL: "http://localhost:8080/api/"
});

const secureClient = axios.create({
    baseURL: "http://localhost:8080/api/",
});

secureClient.interceptors.request.use((config) => {
    let token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export {
    client,
    secureClient
};
