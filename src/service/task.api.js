import {axiosInstance} from "./AxiosInstanceService"
import {GET_ALL_USERS} from "./user.api";

export const USER = "/task"
export const SAVE_TASK = USER + "/addTask"
export const UPDATE_TASK = USER + "/updateTask"
export const DELETE_TASK = USER + "/deleteTask"
export const UPDATE_TASK_STATUS = USER + "/updateTaskStatus"


export const GET_ALL_TASK=USER + "/getAllTasks"

export function saveTask(data) {
    return axiosInstance.post(`${SAVE_TASK}`, data).then((res) => res)
}
export function getAllTasks() {
    return axiosInstance.get(`${GET_ALL_TASK}`).then((res) => res)
}
export function updateTask(data) {
    const id=data.id;
    delete data["id"];
    return axiosInstance.put(`${UPDATE_TASK}/${id}`, data).then((res) => res)
}
export function deleteTask(id) {
    return axiosInstance.delete(`${DELETE_TASK}/${id}`).then((res) => res)
}
export function updateTaskStatus(data) {
    delete data["id"];
    return axiosInstance.put(`${UPDATE_TASK_STATUS}`, data).then((res) => res)
}