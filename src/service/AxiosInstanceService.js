// import axios from "axios";
// import showNotification from "../shared/helper/notification";
//
// export const BASE_URL = 'http://localhost:8080/';
//
// export const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_ECOMMERCE_API_HOST,
// })
//
// axiosInstance.interceptors.request.use(config => {
//         const token = localStorage.getItem("access_token")
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (err) => Promise.reject(err)
// )
//
// axiosInstance.interceptors.response.use(
//     (response)=>{
//         setLogoutTime();
//         window.addEventListener('mousemove',()=>{
//             setLogoutTime();
//         })
//         window.addEventListener('keydown',()=>{
//             setLogoutTime();
//         })
//         response = response.data ? response.data : response;
//         return response;
//         },
//      (error) => {
//         let response = {
//             status: false,
//             message: "Something Went Wrong"
//         };
//         if (error.response.status === 401) {
//             // Handle token expiration here (refresh token or redirect to login)
//             // console.log('Unauthorized, logging out...');
//             localStorage.removeItem('accessToken'); // Clear the token
//             window.location.href = '/login'; // Redirect to login
//         }
//         else if(error.response.status === 403){
//             showNotification("You Are Not Authorized To Proceed",'error');
//         }
//         else if (error.response.data && error.response.data.message) {
//             response = error.response.data ? error.response.data : response;
//             showNotification(response,'error');
//             throw response;
//         } else {
//             throw response;
//         }
//         // return Promise.reject(error);
//     }
// )
//
// const requestConfig = (options) => {
//     const config = {
//         headers: options.headers || { 'Content-Type': 'application/json' },
//         url: options.url,
//         method: options.method,
//         ...options,
//     };
//
//     if (options.body) config.data = options.body;
//     if (options.params) config.params = options.params;
//     if (options.cancelToken) config.cancelToken = options.cancelToken;
//
//     return config;
// };
//
// export const request = (options) => {
//     const config = requestConfig(options);
//     if (navigator.onLine) {
//         return axiosInstance.request(config);
//     }
//     return {
//         status: false,
//         message: 'Internet Disconnected',
//     };
// };
// let setLogoutTime=()=>{
//     localStorage.setItem('AccessLogOut',new Date().getTime()+90000)
// }
// // Check every 30 second is user is active or not in any tab?
// setInterval(()=>{
//     let timeout= localStorage.getItem('AccessLogOut')
//     if(timeout && timeout-new Date().getTime()<1){
//         localStorage.clear();
//         window.location.reload();
//     }
// },30000)
// export default request;
import axios from "axios";
import showNotification from "../shared/helper/notification";

export const BASE_URL = 'http://localhost:8080/';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ECOMMERCE_API_HOST,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Reset logout timer on successful response
        setLogoutTime();

        // Set up event listeners for user activity - only need to do this once per response
        window.addEventListener('mousemove', setLogoutTime);
        window.addEventListener('keydown', setLogoutTime);

        return response.data ? response.data : response;
    },
    (error) => {
        let response = {
            status: false,
            message: "Something Went Wrong",
        };

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("access_token"); // Clear only the token

            // Redirect to login without using window.location.reload()
            window.location.href = "/login";
        } else if (error.response && error.response.status === 403) {
            showNotification("You Are Not Authorized To Proceed", "error");
            window.location.href = "/login";
        } else if (error.response && error.response.data && error.response.data.message) {
            response = error.response.data;
            showNotification(response.message, "error");
            window.location.href = "/login";
            throw response;
        } else if (error.toString().includes("Network Error")) {
            // Handle network errors specifically
            window.location.href = "/login";
            throw response;
        } else {
            throw response;
        }
    }
);

const requestConfig = (options) => {
    const config = {
        headers: options.headers || { "Content-Type": "application/json" },
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
        message: "Internet Disconnected",
    };
};

// Set logout time (15 minutes - 900000ms)
const setLogoutTime = () => {
    localStorage.setItem("AccessLogOut", new Date().getTime() + 9000000);
};

// Check every 30 seconds if the user is inactive
setInterval(() => {
    let timeout = localStorage.getItem("AccessLogOut");

    // Using similar comparison logic from your working code
    if (timeout && timeout - new Date().getTime() < 1) {
        // Clear localStorage
        localStorage.clear();

        // Use reload instead of direct redirection
        // This will trigger the request interceptor on page reload
        // and redirect to login if no token is found
        window.location.reload();
    }
}, 300000);

// Initialize the logout timer when this file is first loaded
setLogoutTime();

export default request;
