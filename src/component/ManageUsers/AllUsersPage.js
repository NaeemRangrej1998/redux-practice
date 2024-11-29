import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getAllUsers, getUserById} from "../../service/user.api";
import {Button, Card} from "react-bootstrap";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function AllUsersPage() {
    const [user, setUser] = useState({
        data: [],
        totalPages: 0,
        pageSize: 10,
        pageNumber: 0
    })
    const [currentPage, setCurrentPage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedUser, setSelectedUser] = useState([])
    useEffect(() => {
        getAllSavedUsers()
    }, [currentPage]);

    const getAllSavedUsers = () => {
        getAllUsers(currentPage, user.pageSize).then((res) => {
            if (res.status && res.status == 200) {
                setUser({
                    data: res.data.content,
                    totalPages: res.totalPages,
                    pageSize: user.pageSize,
                    pageNumber: currentPage
                })
            }
            console.log({res});
        })
    }
    const toggleAddUser = () => {
        setIsOpen(!isOpen)
        console.log({isOpen});
    }

    const toggleEditUser = (id) => {
        if (!isEditing) {
            // Fetch user details only when opening the modal
            setSelectedId(id)
            getUser(id)
        }
        setIsEditing(!isEditing)
    }
    const getUser = (selectedId) => {
        getUserById(selectedId).then((res) => {
            console.log(res.data)
            if (res.status && res.status == 200) {
                setSelectedUser(res.data)
            } else {
                throw res
            }
        }).catch((error) => {
            console.error(error)
        })
    }
    return (
        <div className="mt-5">
            <div className="row">
                <div className="col-md-12">
                    <Card className="shadow border-0 p-4">
                        <Card.Body>
                            <Card.Title>
                                <div className="d-flex">
                                    <h5 className="table-title">
                                        Manage User
                                    </h5>
                                    <Button variant="primary"  style={{marginLeft:"auto"}} onClick={toggleAddUser}>Add User</Button>
                                </div>
                            </Card.Title>
                            <hr/>
                            <table className="table table-striped">
                                <thead className="text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {user?.data.map((users, id) => {
                                    return (
                                        <tr className="text-center" key={id}>
                                            <td>{users.id}</td>
                                            <td>{users.firstName}</td>
                                            <td>{users.lastName}</td>
                                            <td>{users.email}</td>
                                            <td style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-evenly"
                                            }}>
                                                {/*<Link to={`/edit-user/${1}`}>*/}
                                                <i className="fa fa-pencil" aria-hidden="true"
                                                   onClick={() => toggleEditUser(users.id)}></i>
                                                {/*</Link>*/}
                                                <Link to={`/user/${1}`}>
                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                </Link>

                                                <i className="fa fa-trash" aria-hidden="true"
                                                    // onClick={() => handelDelete(item.id)}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <AddUser
                isOpen={isOpen}
                toggleAddUser={toggleAddUser}
                getAllSavedUsers={getAllSavedUsers}
            />
            {isEditing && (<EditUser
                isOpen={isEditing}
                toggleEditUser={toggleEditUser}
                getAllSavedUsers={getAllSavedUsers}
                selectedId={selectedId}
                selectedUser={selectedUser}
            />)}
        </div>
    )
}

export default AllUsersPage
