// import {
//     Grid, Button, TextField, Paper, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Pagination
// } from "@mui/material";
// import '../UserManagement/style/userlist.scss'
// import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
// import {deleteUserById, getAllUsers} from "../../../service/user.api";
// import {Box} from "@mui/system";
// import AddUser from "../ManageUsers/AddUser";
// import {IconButton} from "@mui/material";
// import {Edit, Delete} from "@mui/icons-material";
// import {debounce} from "lodash";
// import {getUserRoles} from "../../../service/role.api";
// import showNotification from "../../../shared/helper/notification";
// import AlertDialog from "../Dailoag/AlertDialog";
//
// const columns = [{id: 'firstName', label: 'First Name'}, {id: 'lastName', label: 'Last Name'}, {id: 'email', label: 'Email'}, {id: 'userRole', label: 'Role'},];
//
// // const handleInputChanges = (e) => {
// //     setPage(1)
// //     getAllSavedUsers()
// // }
// // const debounce = (callingFun, wait) => {
// //     let interval;
// //     return (e) => {
// //         clearTimeout(interval)
// //         interval = setTimeout(() => callingFun(e), wait)
// //     }
// // }
// // // const debounceCallingHandle = useMemo(() => debounce(handleInputChanges,1000),[]);
// // const debounceCallingHandle =debounce(handleInputChanges,1000);
//
// export const UserList = () => {
//
//     const [user, setUser] = useState({data: []})
//     const [page, setPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [selectedUser, setSelectedUser] = useState([])
//     const [searchValue, setSearchValue] = useState('')
//     const [inputValue, setInputValue] = useState('')
//     const [roles, setRoles] = useState([]);
//     const [statusText,setStatusText] =useState('')
//     const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
//     const [deleteRoleId, setDeleteRoleId] = useState("")
//     const [isDeletingRole, setIsDeletingRole] = useState(false)
//
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage - 1)
//     };
//     const toggleAddUser = () => {
//         setIsOpen(!isOpen)
//         setIsEditing(false)
//     }
//
//     function handleEdit(row) {
//         setSelectedUser(row)
//         setIsEditing(true)
//         setIsOpen(true)
//     }
//
//
//     // const handleInputChanges = (e) => {
//     //     setSearchValue(e.target.value);
//     //     setPage(1)
//     //     console.log(e.target.value)
//     //     // getAllSavedUsers()
//     // }
//     // const debounce = (callingFun, wait) => {
//     //     let interval;
//     //     return (e) => {
//     //         clearTimeout(interval)
//     //         interval = setTimeout(() => callingFun(e), wait)
//     //     }
//     // }
//
//     const getAllSavedUsers = () => {
//         getAllUsers(page, rowsPerPage,searchValue).then((res) => {
//             if (res.status && res.status == 200) {
//                 setUser({
//                     data: res.data.content,
//                 })
//                 setTotalPages(res.data.totalPages)
//             }
//         })
//     }
//
//     // const debounceCallingHandle = useCallback(debounce(getAllSavedUsers,1000),[]);
// //     const debounceCallingHandle =debounce(handleInputChanges,1000);
// // Debounced function for updating search value
//     const debouncedSearch = useCallback(
//         debounce((value) => {
//             setSearchValue(value);
//             setPage(0); // Reset pagination when searching
//         }, 1000),
//         []
//     );
//
//     // Handle input changes
//     const handleInputChanges = (e) => {
//         setInputValue(e.target.value); // Updates TextField immediately
//         debouncedSearch(e.target.value); // Delayed update of `searchValue`
//     };
//     useEffect(() => {
//         getAllSavedUsers()
//     }, [page,searchValue]);
//
//     useEffect(() => {
//         fetchRoles();
//     }, []);
//
//     const fetchRoles = async () => {
//         try {
//             const res = await getUserRoles();
//             if (res.status === 200 && Array.isArray(res.data)) { // Ensure it's an array
//                 const formattedRole = res.data.map(item => ({
//                     label: item.roleName,
//                     value: item.id
//                 }));
//                 console.log({ formattedRole }); // Debugging log
//                 setRoles(formattedRole); // Set formatted roles
//             } else {
//                 console.error("Invalid response format:", res);
//             }
//         } catch (err) {
//             console.error("Error fetching roles:", err);
//         }
//     };
//     const handleDeleteDataSource = (rows) => {
//         console.log({rows})
//         setStatusText(`You want to Delete ${rows["firstName"]} with roles of ${rows["userRole"]}?`)
//         setDeleteRoleId(rows["id"])
//         setIsDeletingRole(true)
//         onToggleDeleteStatusModal()
//         // this.setState(
//         //     {
//         //         statusText: ,
//         //         deleteRoleId: ,
//         //         isDeletingRole: true
//         //     },
//         //     () => onToggleDeleteStatusModal()
//         // );
//     };
//     const onToggleDeleteStatusModal = (props, confirm) => {
//         if (!props || (props && !confirm)) {
//             // if props is undefined then alert modal will be shown or
//             // if props is available & confirm is not available then user hasn't hit the confirm button
//             setIsStatusModalOpen(!isStatusModalOpen)
//         } else if (props && confirm) {
//             // if props & confirm is available then user has hit the confirm button.
//             if (deleteRoleId) {
//                 deleteDataSourceById(deleteRoleId);
//             }
//         }
//     };
//     const deleteDataSourceById = (deleteRoleId) => {
//         // const { intl } = this.props;
//         // this.setState({
//         //     isGetLoading: false,
//         //     isAPIStatusLoading: true
//         // });
//         deleteUserById(deleteRoleId)
//             .then((response) => {
//                 if (response.status && response.status === 200) {
//                     setIsStatusModalOpen(!isStatusModalOpen)
//                     showNotification(response.message,'success');
//                     getAllSavedUsers()
//                     // this.setState(
//                     //     (prevState) => {
//                     //         return {
//                     //             isStatusModalOpen: !prevState.isStatusModalOpen,
//                     //             isGetLoading: false,
//                     //             isAPIStatusLoading: false
//                     //         };
//                     //     },
//                     //     () =>
//                     //         this.getDatasourceList({
//                     //             pageNo: this.state.pageNo,
//                     //             searchValue: this.state.searchValue,
//                     //             pageSize: this.state.pageSize
//                     //         })
//                     // );
//                 } else {
//                     throw response;
//                 }
//             })
//             .catch((error) => {
//                 setIsStatusModalOpen(!isStatusModalOpen)
//                 showNotification(error.message,'error');
//                 // this.setState({
//                 //     isStatusModalOpen: !this.state.isStatusModalOpen,
//                 //     isGetLoading: false,
//                 //     isAPIStatusLoading: false
//                 // });
//                 // let message = error.message
//                 //     ? error.message
//                 //     : intl.formatMessage({
//                 //         id: "SOMETHING.WRONG"
//                 //     });
//                 // warningToast(message);
//             });
//     };
//
//     return (<div>
//         <Grid container style={{width: '100%', overflow: 'auto'}} className="grid-container">
//             <Grid item xs={12}>
//                 <h2 className="heading-left">User List</h2>
//             </Grid>
//             <Grid
//                 item
//                 xs={12}
//                 style={{justifyContent: 'space-between', backgroundColor: '#F7F9FB'}}>
//                 <div className="two-container">
//                     <div>
//                         <Button className="add-button" size="medium" onClick={toggleAddUser}>
//                             Add
//                         </Button>
//                     </div>
//                     <div>
//                             <span>
//                                 <TextField
//                                     variant="outlined"
//                                     size="small"
//                                     placeholder="Search"
//                                     // value={searchValue}
//                                     value={inputValue} // Uses `inputValue` for immediate display
//                                     onChange={handleInputChanges} // Debounced API call
//                                     // onChange={debounceCallingHandle}
//                                     // onChange={(e)=> {
//                                     //     setSearchValue(e.target.value)
//                                     //     debounceCallingHandle(e.target.value,1000)
//                                     // }}
//                                 />
//                             </span>
//                     </div>
//                 </div>
//             </Grid>
//             <Grid item xs={12}>
//                 <div>
//                     <Paper elevation={2} style={{marginTop: '20px'}}>
//                         <TableContainer>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         {columns.map((column) => (<TableCell key={column.id}>
//                                             {column.label}
//                                         </TableCell>))}
//                                         <TableCell align="center">Actions</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {user.data.map((rows) => {
//                                         return (
//                                             <TableRow>
//                                                 {columns.map((column) => {
//                                                     const value = rows[column.id];
//                                                     return (
//                                                         <TableCell key={column.id} align={column.align}>
//                                                             <Box
//                                                                 display="flex"
//                                                                 alignItems="center"
//                                                                 style={{gap: "8px" }}>
//                                                                 {value}
//                                                             </Box>
//                                                         </TableCell>
//                                                     );
//                                                 })}
//                                                 <TableCell align="center">
//                                                     <Box
//                                                         display="flex"
//                                                         justifyContent="center"
//                                                         gap="8px"
//                                                     >
//                                                         <IconButton
//                                                             color="primary"
//                                                             onClick={() => handleEdit(rows)}
//                                                         >
//                                                             <Edit/>
//                                                         </IconButton>
//                                                         <IconButton color="error" onClick={() => handleDeleteDataSource(rows)}>
//                                                         <Delete/>
//                                                     </IconButton>
//                                                 </Box>
//                                             </TableCell>
//                                     </TableRow>
//                                         )
//                                     })}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Paper>
//                     <Pagination
//                         shape="rounded"
//                         count={totalPages}
//                         page={page}
//                         onChange={handleChangePage}
//                     />
//                 </div>
//             </Grid>
//         </Grid>
//         <AddUser
//             isOpen={isOpen}
//             toggleAddUser={toggleAddUser}
//             getAllSavedUsers={getAllSavedUsers}
//             selectedUser={selectedUser}
//             isEditing={isEditing}
//             activeRole={roles}
//         />
//         <AlertDialog
//             confirmText={"Yes"}
//             cancelText={"No"}
//             alertMessage={statusText}
//             toggleAlertModal={onToggleDeleteStatusModal}
//             isAlertModalOpen={isStatusModalOpen}
//             title={"Are you sure?"}
//             // isLoading={isAPIStatusLoading}
//             // statusData={statusDatasourceData}
//         />
//     </div>)
// }
// export default UserList

import {
    Grid, Button, TextField, Paper, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Pagination
} from "@mui/material";
import '../UserManagement/style/userlist.scss';
import React, { useCallback, useEffect, useState } from "react";
import { deleteUserById, getAllUsers } from "../../../service/user.api";
import { Box } from "@mui/system";
import AddUser from "../ManageUsers/AddUser";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { debounce } from "lodash";
import { getUserRoles } from "../../../service/role.api";
import showNotification from "../../../shared/helper/notification";
import AlertDialog from "../Dailoag/AlertDialog";

const columns = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'userRole', label: 'Role' }
];

export const UserList = () => {
    const [user, setUser] = useState({ data: [] });
    const [page, setPage] = useState(1); // Start at page 1 for UI display
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [roles, setRoles] = useState([]);
    const [statusText, setStatusText] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [deleteRoleId, setDeleteRoleId] = useState("");
    const [isDeletingRole, setIsDeletingRole] = useState(false);

    // Handle page change from Pagination component
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const toggleAddUser = () => {
        setIsOpen(!isOpen);
        setIsEditing(false);
    };

    function handleEdit(row) {
        setSelectedUser(row);
        setIsEditing(true);
        setIsOpen(true);
    }

    // Debounced function for updating search value
    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchValue(value);
            setPage(1); // Reset to first page when searching
        }, 1000),
        []
    );

    // Handle input changes
    const handleInputChanges = (e) => {
        setInputValue(e.target.value); // Updates TextField immediately
        debouncedSearch(e.target.value); // Delayed update of searchValue
    };

    const getAllSavedUsers = useCallback(() => {
        // Convert page from 1-based (UI) to 0-based (API)
        const apiPageIndex = page - 1;

        getAllUsers(apiPageIndex, rowsPerPage, searchValue).then((res) => {
            if (res.status && res.status === 200) {
                setUser({
                    data: res.data.content,
                });
                setTotalPages(res.data.totalPages);
            }
        });
    }, [page, rowsPerPage, searchValue]);

    useEffect(() => {
        getAllSavedUsers();
    }, [getAllSavedUsers]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await getUserRoles();
            if (res.status === 200 && Array.isArray(res.data)) {
                const formattedRole = res.data.map(item => ({
                    label: item.roleName,
                    value: item.id
                }));
                setRoles(formattedRole);
            } else {
                console.error("Invalid response format:", res);
            }
        } catch (err) {
            console.error("Error fetching roles:", err);
        }
    };

    const handleDeleteDataSource = (rows) => {
        setStatusText(`You want to Delete ${rows.firstName} with roles of ${rows.userRole}?`);
        setDeleteRoleId(rows.id);
        setIsDeletingRole(true);
        onToggleDeleteStatusModal();
    };

    const onToggleDeleteStatusModal = (props, confirm) => {
        if (!props || (props && !confirm)) {
            setIsStatusModalOpen(!isStatusModalOpen);
        } else if (props && confirm) {
            if (deleteRoleId) {
                deleteDataSourceById(deleteRoleId);
            }
        }
    };

    const deleteDataSourceById = (deleteRoleId) => {
        deleteUserById(deleteRoleId)
            .then((response) => {
                if (response.status && response.status === 200) {
                    setIsStatusModalOpen(!isStatusModalOpen);
                    showNotification(response.message, 'success');
                    getAllSavedUsers();
                } else {
                    throw response;
                }
            })
            .catch((error) => {
                setIsStatusModalOpen(!isStatusModalOpen);
                showNotification(error.message, 'error');
            });
    };

    return (
        <div>
            <Grid container style={{ width: '100%', overflow: 'auto' }} className="grid-container">
                <Grid item xs={12}>
                    <h2 className="heading-left">User List</h2>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ justifyContent: 'space-between', backgroundColor: '#F7F9FB' }}>
                    <div className="two-container">
                        <div>
                            <Button className="add-button" size="medium" onClick={toggleAddUser}>
                                Add
                            </Button>
                        </div>
                        <div>
                            <span>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search"
                                    value={inputValue}
                                    onChange={handleInputChanges}
                                />
                            </span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Paper elevation={2} style={{ marginTop: '20px' }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.data.length > 0 ? (
                                            user.data.map((rows) => (
                                                <TableRow key={rows.id}>
                                                    {columns.map((column) => {
                                                        const value = rows[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Box
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    style={{ gap: "8px" }}>
                                                                    {value}
                                                                </Box>
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell align="center">
                                                        <Box
                                                            display="flex"
                                                            justifyContent="center"
                                                            gap="8px"
                                                        >
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => handleEdit(rows)}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                            <IconButton color="error" onClick={() => handleDeleteDataSource(rows)}>
                                                                <Delete />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1} align="center">
                                                    No users found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Box mt={2} display="flex" justifyContent="center">
                            <Pagination
                                shape="rounded"
                                count={totalPages}
                                page={page}
                                onChange={handleChangePage}
                            />
                        </Box>
                    </div>
                </Grid>
            </Grid>
            <AddUser
                isOpen={isOpen}
                toggleAddUser={toggleAddUser}
                getAllSavedUsers={getAllSavedUsers}
                selectedUser={selectedUser}
                isEditing={isEditing}
                activeRole={roles}
            />
            <AlertDialog
                confirmText={"Yes"}
                cancelText={"No"}
                alertMessage={statusText}
                toggleAlertModal={onToggleDeleteStatusModal}
                isAlertModalOpen={isStatusModalOpen}
                title={"Are you sure?"}
            />
        </div>
    );
};

export default UserList;