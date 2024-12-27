import { axiosInstance } from "./AxiosInstanceService";

export const GET_ALL_ROLES = "/role/getAllRole";

// Function to get all roles
export function getUserRoles() {
    return axiosInstance.get("/role/getAllRole").then((response)=>response.data); // Returns a promise
}
