import axios from "axios";
import config from "bootstrap/js/src/util/config";

export const BASE_URL = 'http://localhost:8080/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            // Handle token expiration here (refresh token or redirect to login)
            console.log('Unauthorized, logging out...');
            localStorage.removeItem('accessToken'); // Clear the token
            window.location.href = '/login'; // Redirect to login
        }
        else if(error.response.status === 403){
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

