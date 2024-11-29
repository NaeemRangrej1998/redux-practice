import {axiosInstance} from "./AxiosInstanceService"

export const USER = "/user"
export const GET_ALL_USERS = USER + "/getUser"

export const SAVE_USER = USER + "/addUser"
export const UPDATE_USER = USER + "/updateUser"


export const GET_USER_BY_ID = USER + "/getUser"

export function getAllUsers(pageNumber, pageSize) {
    return axiosInstance.get(`${GET_ALL_USERS}?pageNo=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data)
}

export function saveUser(data) {
    return axiosInstance.post(`${SAVE_USER}`, data).then((res) => res.data)
}

export function updateUser(userId,data) {
    return axiosInstance.put(`${UPDATE_USER}/${userId}`, data).then((res) => res.data)
}

export function getUserById(userId) {
    return axiosInstance.get(`${GET_USER_BY_ID}/${userId}`).then((res)=>res.data)
}