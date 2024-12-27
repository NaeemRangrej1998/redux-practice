import {
    Grid, Button, TextField, Paper, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Pagination
} from "@mui/material";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EnableIcon from "../../../assets/icons/EnableIcon";
import DisableIcon from "../../../assets/icons/DisableIcon";
// import {Button} from "react-bootstrap";
import '../UserManagement/style/userlist.scss'
import {TableRows} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../service/user.api";
import {Box} from "@mui/system";
import AddUser from "../ManageUsers/AddUser";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const columns = [{id: 'firstName', label: 'First Name'}, {id: 'lastName', label: 'Last Name'}, {
    id: 'email',
    label: 'Email'
}, {id: 'roleId', label: 'Role'},];
export const UserList = () => {

    const [user, setUser] = useState({
        data: []
    })

    const [page, setPage] = useState(0  );
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedUser, setSelectedUser] = useState([])
    useEffect(() => {
        getAllSavedUsers()
    }, [page]);

    const getAllSavedUsers = () => {
        getAllUsers(page,rowsPerPage).then((res) => {
            if (res.status && res.status == 200) {
                setUser({
                    data: res.data.content,
                })
                setTotalPages(res.totalPages)
            }
            console.log({res});
        })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };
    const toggleAddUser = () => {
        setIsOpen(!isOpen)
        console.log({isOpen});
    }
    return (<div>
        <Grid container style={{width: '100%', overflow: 'auto'}} className="grid-container">
            <Grid item xs={12}>
                <h2 className="heading-left">User List</h2>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    justifyContent: 'space-between', backgroundColor: '#F7F9FB',
                }}
            >
                <div className="two-container">
                    <div>
                        <Button className="add-button" size="medium" onClick={toggleAddUser}
                        >
                            <PlusIcon/> Add
                        </Button>
                    </div>
                    <div>
                            <span>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search"/>
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
                                                                style={{
                                                                    gap: "8px",
                                                                }}
                                                            >
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
                                                            // onClick={() => handleEdit(rows.id)}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton
                                                            color="error"
                                                            // onClick={() => handleDelete(rows.id)}
                                                        >
                                                            <Delete />
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
        />
    </div>)
}
export default UserList