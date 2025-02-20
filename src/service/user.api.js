import {axiosInstance} from "./AxiosInstanceService"

export const USER = "/user"
export const GET_ALL_USERS = USER + "/getUser"

export const SAVE_USER = USER + "/addUser"
export const UPDATE_USER = USER + "/updateUser"


export const GET_USER_BY_ID = USER + "/getUser"

export function getAllUsers(pageNumber, pageSize,searchValue) {
    return axiosInstance.get(`${GET_ALL_USERS}?searchValue=${searchValue}&pageNo=${pageNumber}&pageSize=${pageSize}`).then((res) => res)
}

export function saveUser(data) {
    return axiosInstance.post(`${SAVE_USER}`, data).then((res) => res)
}

export function updateUser(data) {
    let userId = data.id;
    delete data["id"]
    return axiosInstance.put(`${UPDATE_USER}/${userId}`, data).then((res) => res)
}

export function getUserById(userId) {
    return axiosInstance.get(`${GET_USER_BY_ID}/${userId}`).then((res)=>res)
}