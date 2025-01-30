import axios from "axios";
import config from "bootstrap/js/src/util/config";

export const BASE_URL = 'http://localhost:8080/';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ECOMMERCE_API_HOST,
})

axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
    (response)=>{
        response = response.data ? response.data : response;
        return response;
        },
     (error) => {
        let response = {
            status: false,
            message: "Something Went Wrong"
        };
        if (error.response.status === 401) {
            // Handle token expiration here (refresh token or redirect to login)
            console.log('Unauthorized, logging out...');
            localStorage.removeItem('accessToken'); // Clear the token
            window.location.href = '/login'; // Redirect to login
        }
        else if(error.response.status === 403){
            window.location.href = '/login';
        }
        else if (error.response.data && error.response.data.message) {
            response = error.response.data ? error.response.data : response;
            throw response;
        } else {
            throw response;
        }
        // return Promise.reject(error);
    }
)

