import request,{ axiosInstance } from "./AxiosInstanceService";

export function getPermission() {
    return axiosInstance.get("/permission/getAllPermission").then((response)=>response); // Returns a promise
}