import axios from "axios";

export const BASE_URL='http://localhost:8080/auth'

export function userLogin(credentials){
    return axios.post(`${BASE_URL}/singin`,credentials).then(res=>res.data)
}