import {
    Grid, Button, TextField, Paper, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Pagination
} from "@mui/material";
import '../UserManagement/style/userlist.scss'
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getAllUsers} from "../../../service/user.api";
import {Box} from "@mui/system";
import AddUser from "../ManageUsers/AddUser";
import {IconButton} from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import {debounce} from "lodash";

const columns = [{id: 'firstName', label: 'First Name'}, {id: 'lastName', label: 'Last Name'}, {id: 'email', label: 'Email'}, {id: 'roleId', label: 'Role'},];

// const handleInputChanges = (e) => {
//     setPage(1)
//     getAllSavedUsers()
// }
// const debounce = (callingFun, wait) => {
//     let interval;
//     return (e) => {
//         clearTimeout(interval)
//         interval = setTimeout(() => callingFun(e), wait)
//     }
// }
// // const debounceCallingHandle = useMemo(() => debounce(handleInputChanges,1000),[]);
// const debounceCallingHandle =debounce(handleInputChanges,1000);

export const UserList = () => {

    const [user, setUser] = useState({data: []})
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1)
    };
    const toggleAddUser = () => {
        setIsOpen(!isOpen)
        setIsEditing(false)
        console.log({isOpen});
    }

    function handleEdit(row) {
        console.log({row});
        setSelectedUser(row)
        setIsEditing(true)
        setIsOpen(true)
    }


    // const handleInputChanges = (e) => {
    //     setSearchValue(e.target.value);
    //     setPage(1)
    //     console.log(e.target.value)
    //     // getAllSavedUsers()
    // }
    // const debounce = (callingFun, wait) => {
    //     let interval;
    //     return (e) => {
    //         clearTimeout(interval)
    //         interval = setTimeout(() => callingFun(e), wait)
    //     }
    // }

    const getAllSavedUsers = () => {
        getAllUsers(page, rowsPerPage,searchValue).then((res) => {
            if (res.status && res.status == 200) {
                setUser({
                    data: res.data.content,
                })
                setTotalPages(res.data.totalPages)
            }
            console.log({res});
        })
    }

    // const debounceCallingHandle = useCallback(debounce(getAllSavedUsers,1000),[]);
//     const debounceCallingHandle =debounce(handleInputChanges,1000);
// Debounced function for updating search value
    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchValue(value);
            setPage(0); // Reset pagination when searching
        }, 1000),
        []
    );

    // Handle input changes
    const handleInputChanges = (e) => {
        setInputValue(e.target.value); // Updates TextField immediately
        debouncedSearch(e.target.value); // Delayed update of `searchValue`
    };
    useEffect(() => {
        getAllSavedUsers()
    }, [page,searchValue]);

    return (<div>
        <Grid container style={{width: '100%', overflow: 'auto'}} className="grid-container">
            <Grid item xs={12}>
                <h2 className="heading-left">User List</h2>
            </Grid>
            <Grid
                item
                xs={12}
                style={{justifyContent: 'space-between', backgroundColor: '#F7F9FB'}}>
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
                                    // value={searchValue}
                                    value={inputValue} // Uses `inputValue` for immediate display
                                    onChange={handleInputChanges} // Debounced API call
                                    // onChange={debounceCallingHandle}
                                    // onChange={(e)=> {
                                    //     setSearchValue(e.target.value)
                                    //     debounceCallingHandle(e.target.value,1000)
                                    // }}
                                />
                            </span>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div>
                    <Paper elevation={2} style={{marginTop: '20px'}}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (<TableCell key={column.id}>
                                            {column.label}
                                        </TableCell>))}
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.data.map((rows) => {
                                        return (
                                            <TableRow>
                                                {columns.map((column) => {
                                                    const value = rows[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                style={{gap: "8px" }}>
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
                                                            <Edit/>
                                                        </IconButton>
                                                        <IconButton color="error"
                                                            // onClick={() => handleDelete(rows.id)}
                                                        >
                                                            <Delete/>
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Pagination
                        shape="rounded"
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </Grid>
        </Grid>
        <AddUser
            isOpen={isOpen}
            toggleAddUser={toggleAddUser}
            getAllSavedUsers={getAllSavedUsers}
            selectedUser={selectedUser}
            isEditing={isEditing}
        />
    </div>)
}
export default UserList