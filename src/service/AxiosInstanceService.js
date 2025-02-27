import axios from "axios";
import showNotification from "../shared/helper/notification";

export const BASE_URL = 'http://localhost:8080/';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ECOMMERCE_API_HOST,
})

axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("access_token")
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
            // console.log('Unauthorized, logging out...');
            localStorage.removeItem('accessToken'); // Clear the token
            window.location.href = '/login'; // Redirect to login
        }
        else if(error.response.status === 403){
            showNotification("You Are Not Authorized To Proceed",'error');
        }
        else if (error.response.data && error.response.data.message) {
            response = error.response.data ? error.response.data : response;
            showNotification(response,'error');
            throw response;
        } else {
            throw response;
        }
        // return Promise.reject(error);
    }
)

const requestConfig = (options) => {
    const config = {
        headers: options.headers || { 'Content-Type': 'application/json' },
        url: options.url,
        method: options.method,
        ...options,
    };

    if (options.body) config.data = options.body;
    if (options.params) config.params = options.params;
    if (options.cancelToken) config.cancelToken = options.cancelToken;

    return config;
};

export const request = (options) => {
    const config = requestConfig(options);
    if (navigator.onLine) {
        return axiosInstance.request(config);
    }
    return {
        status: false,
        message: 'Internet Disconnected',
    };
};

export default request;
