import request,{ axiosInstance } from "./AxiosInstanceService";

export const GET_ALL_ROLES = "/role/getAllRole";

// Function to get all roles
export function getUserRoles() {
    return axiosInstance.get("/role/getAllRole").then((response)=>response); // Returns a promise
}
export const deleteWidget = (roleId) => {
    return request({
        url: `/role/deleteRole/${roleId}`,
        method: 'DELETE',
    });
};
export const addRole=(addRole)=>{
    return request({
        url:'/role/addRole',
        method:'POST',
        body:addRole
    })
}
export const updateRoleById=(body)=>{
    let id=body.id
    delete body["id"]
    return request({
        url: `/role/updateRole/${id}`,
        method:'put',
        body:body
    })
}
