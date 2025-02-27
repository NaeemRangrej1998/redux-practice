import React, {useEffect, useState} from 'react'
import {Button, Card,Table} from "react-bootstrap";
import './Role.scss'
import {deleteWidget, getUserRoles} from "../../../service/role.api";
import {Link} from "react-router-dom";
import AlertDialog from "../Dailoag/AlertDialog";
import showNotification from "../../../shared/helper/notification";
import AddEditRole from "./AddEditRole";
export const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [statusText,setStatusText] =useState('')
    const [deleteRoleId, setDeleteRoleId] = useState("")
    const [isDeletingRole, setIsDeletingRole] = useState(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [roleName, setRoleName] = useState('')
    const [roleId, setRoleId] = useState('')
    useEffect(() => {
        getAllRoles()
    }, []);
    const getAllRoles = async () => {
        try {
            const res = await getUserRoles();
            if (res.status === 200) {
                setRoles(res.data);
                console.log({roles});
            } else {
                console.error("Failed to fetch roles:", res);
            }
        } catch (err) {
            console.error("Error fetching roles:", err);
        }
    };

    const handleDeleteDataSource = (roles) => {
        console.log({roles});
        setStatusText(`You want to Delete ${roles["roleName"]} roles ?`)
        setDeleteRoleId(roles["id"])
        setIsDeletingRole(true)
        onToggleDeleteStatusModal()
        // this.setState(
        //     {
        //         statusText: ,
        //         deleteRoleId: ,
        //         isDeletingRole: true
        //     },
        //     () => onToggleDeleteStatusModal()
        // );
    };
    const onToggleDeleteStatusModal = (props, confirm) => {
        if (!props || (props && !confirm)) {
            // if props is undefined then alert modal will be shown or
            // if props is available & confirm is not available then user hasn't hit the confirm button
            setIsStatusModalOpen(!isStatusModalOpen)
        } else if (props && confirm) {
            // if props & confirm is available then user has hit the confirm button.
            if (deleteRoleId) {
                deleteDataSourceById(deleteRoleId);
            }
        }
    };
    const deleteDataSourceById = (deleteRoleId) => {
        console.log({deleteRoleId})
        // const { intl } = this.props;
        // this.setState({
        //     isGetLoading: false,
        //     isAPIStatusLoading: true
        // });
        deleteWidget(deleteRoleId)
            .then((response) => {
                if (response.status && response.status === 200) {
                    setIsStatusModalOpen(!isStatusModalOpen)
                    showNotification(response.message,'success');
                    getAllRoles()
                    // this.setState(
                    //     (prevState) => {
                    //         return {
                    //             isStatusModalOpen: !prevState.isStatusModalOpen,
                    //             isGetLoading: false,
                    //             isAPIStatusLoading: false
                    //         };
                    //     },
                    //     () =>
                    //         this.getDatasourceList({
                    //             pageNo: this.state.pageNo,
                    //             searchValue: this.state.searchValue,
                    //             pageSize: this.state.pageSize
                    //         })
                    // );
                } else {
                    throw response;
                }
            })
            .catch((error) => {
                setIsStatusModalOpen(!isStatusModalOpen)
                showNotification(error.message,'error');
                // this.setState({
                //     isStatusModalOpen: !this.state.isStatusModalOpen,
                //     isGetLoading: false,
                //     isAPIStatusLoading: false
                // });
                // let message = error.message
                //     ? error.message
                //     : intl.formatMessage({
                //         id: "SOMETHING.WRONG"
                //     });
                // warningToast(message);
            });
    };

    const toggleAddRole =() =>{
        setIsOpen(!isOpen)
        setIsEditing(false)
    }

    const editRole =(roles) =>{
        setIsOpen(true)
        setIsEditing(true)
        setRoleName(roles['roleName'])
        setRoleId(roles['id'])
    }
    return (
        <>
            <div className="row">
                <div className={"col-md-12"}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <div className="table-title">
                                    <h5>Manage Dashboards</h5>
                                    <Button
                                        className={"ml-auto"}
                                        variant="primary"
                                        onClick={toggleAddRole}>
                                        Add Role
                                    </Button>
                                </div>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr style={{textAlign: 'center'}}>
                                        <th>Id</th>
                                        <th>RoleName</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {roles.map((roles, id) => {
                                        return (
                                            <tr className="text-center" key={id}>
                                                <td>{roles.id}</td>
                                                <td>{roles.roleName}</td>
                                                <td style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-evenly"
                                                }}>
                                                    <i className="fa fa-eye" aria-hidden="true"  onClick={() => editRole(roles)}></i>
                                                    <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDeleteDataSource(roles)}></i>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                        </Card.Body>
                        <hr/>
                    </Card>
                </div>
            </div>
            <AddEditRole
                isOpen={isOpen}
                toggleAddRole={toggleAddRole}
                getAllRoles={getAllRoles}
                isEditing={isEditing}
                roleName={roleName}
                roleId={roleId}
            />
            <AlertDialog
                confirmText={"Yes"}
                cancelText={"No"}
                alertMessage={statusText}
                toggleAlertModal={onToggleDeleteStatusModal}
                isAlertModalOpen={isStatusModalOpen}
                title={"Are you sure?"}
                // isLoading={isAPIStatusLoading}
                // statusData={statusDatasourceData}
            />
        </>
    )
}
export default RoleList;