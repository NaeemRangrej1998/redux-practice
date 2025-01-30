import axios from "axios";

export const BASE_URL='http://localhost:8080/auth'

export function userLogin(credentials){
    return axios.post(`${BASE_URL}/singin`,credentials).then(res=>res.data)
}

export function getUserEmail(credentials){
    return axios.post(`${BASE_URL}/forgot-password`,credentials).then(res=>res.data)
}
export function resetPassword(credentials){
    return axios.post(`${BASE_URL}/reset-password`,credentials).then(res=>res.data)
}