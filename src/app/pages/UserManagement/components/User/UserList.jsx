import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import "../../../../../scss/pages/UserManagement/component/UserList.scss";
import EnableIcon from "../../../../../assets/icons/EnableIcon";
import PlusIcon from "../../../../../assets/icons/PlusIcon";
import DisableIcon from "../../../../../assets/icons/DisableIcon";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import SortIcon from "../../../../../assets/icons/SortIcon";
import UserListUserIcon from "../../../../../assets/icons/UserListUserIcon";
import AssociatedConfigsDialog from "../UserGroup/AssociatedConfigsDialog";
import AssociateUserGroupModal from "./AssociateUserGroupModal";
import AssociatedTcuModal from "./AssociatedTcuModal";
import {
  disableUserAPI,
  enableUserAPI,
  getCustomerListAPI,
  getRolesAPI,
  getUserList,
  toggleUserAPI,
} from "../../../../../api/user/users.api";
import AddEditUserModal from "./AddEditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import showNotification from "../../../../../shared/helpers/notification";
import BlockLoader from "../../../../../shared/components/Loader/BlockLoader";
import { useSelector } from "react-redux";
import roleEnum from "../../../../../enums/role.enum";
import { formatDate } from "../../../../../shared/helpers/dateFormat";
import MinusIcon from "../../../../../assets/icons/MinusIcon";
import {checkAllSelected, checkSomeSelected} from "../../../../../shared/helpers/table.util";

const columns = [
  { id: "select", label: "", type: "checkbox", align: "left" },
  { id: "first_name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "group_count", label: "Associate User Group" },
  { id: "tcu_count", label: "Associate TCU" },
  { id: "config_count", label: "Associated Configs" },
  { id: "last_login_date", label: "Last Login" },
  { id: "customer_name", label: "Company Name" },
  { id: "role_name", label: "User Role" },
  { id: "account_status", label: "Control" },
];

const UserList = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selectedCheckBox, setSelectedCheckBox] = useState([]); // State for selected checkboxes
  const [rowsData, setRowsData] = useState([]);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAssociatedConfigModalOpen, setIsAssociatedConfigModalOpen] =
    useState(false);
  const [associatedConfigData, setAssociatedConfigData] = useState(null);
  const [isAssociateUserGroupModal, setIsAssociateUserGroupModal] =
    useState(false);
  const [associateUserGroupData, setAssociateUserGroupData] = useState(null);
  const [isAssociatedTcuModelOpen, setIsAssociatedTcuModelOpen] =
    useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userRole = useSelector((state) => state.auth.role);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [filteredRows, setFilteredRows] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getCustomerListSelect = async () => {
    try {
      const response = await getCustomerListAPI();
      if (response.status_code === 200) {
        setCompanyList(
          response.data.customers.map((customer) => ({
            label: customer.company_name,
            value: customer.customer_id,
          }))
        );
      } else {
        showNotification(response.message, "error");
      }
    } catch (error) {
      showNotification(error.message || "Failed to fetch roles", "error");
    }
  };
  const getUserRolesSelect = async () => {
    try {
      const response = await getRolesAPI();
      if (response.status_code === 200) {
        setUserRoles(
          response.data.roles.map((role) => ({
            label: role.role_name,
            value: role.role_id,
          }))
        );
      } else {
        showNotification(response.message, "error");
      }
    } catch (error) {
      showNotification(error.message || "Failed to fetch roles", "error");
    }
  };

  useEffect(() => {
    if (isSearch) {
      getCustomerListSelect();
      getUserRolesSelect();
      GetTableData();
    }
  }, [isSearch]);

  useEffect(() => {
    getCustomerListSelect();
    getUserRolesSelect();
    GetTableData();
  }, [page, rowsPerPage, orderBy, order, searchText]);

  const GetTableData = () => {
    const params = {
      is_show_all: true,
      search_term: searchText.trim(),
      page: page,
      page_size: rowsPerPage,
      sort_field: orderBy,
      sort_order: order,
    };

    setIsLoading(true);
    getUserList(params)
      .then((response) => {
        if (response.status_code == 200){
          setRowsData(response.data.users);
          setTotalPages(response.data.total_pages);
        }
        else{
          setIsLoading(false)
        }
      
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    } else {
      setIsSearch(false);
      GetTableData();
    }
  };

  const handleSearch = (searchTerm) => {
    setIsSearch(true);
    setPage(1);

    if (!searchTerm) {
      GetTableData();
      return;
    }
      const params = {
        page: 1,
        is_show_all: true,
        search_term: searchTerm.trim(),
      };
      getUserList(params)
        .then((response) => {
          setRowsData(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching unit list:", error);
        });

  };

  const handleAssociatedTcuModelOpen = (row) => {
    setIsAssociatedTcuModelOpen(true);
    setUserId(row.user_id);
  };
  const handleAddUserClose = () => {
    setIsAddUserOpen(false);
  };

  const handleAssociateUserGroupModalOpen = (row) => {
    setIsAssociateUserGroupModal(true);
    setUserId(row.user_id);
  };

  const handleAssociatedConfigsClick = (row) => {
    // setAssociatedConfigData(row["config_count"].split(", "));
    setIsAssociatedConfigModalOpen(true);
    setUserId(row.user_id);
  };

  const handleAddUserOpen = () => {
    setIsAddUserOpen(true);
    setEditMode(false);
    setSelectedUser(null);
  };

  const handleDeleteUserOpen = () => {
    // setIsDeleteUserOpen(true);
    if (selectedCheckBox.length === 0) {
      showNotification("Please select at least one user to delete.", "warning");
    } else {
      setUsersToDelete(selectedCheckBox); // Set the users to delete
      setIsDeleteUserOpen(true); // Open the confirmation modal
    }
  };

  const handleDeleteUserClose = () => {
    setIsDeleteUserOpen(false);
    setSelectedCheckBox([])
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(property);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsData.map((n) => n.user_id); // Use unique identifiers
      setSelectedCheckBox([...new Set([...selectedCheckBox, ...newSelected])]);
    } else if (event.target.indeterminate) {
      setSelectedCheckBox([]);
    } else {
      // setSelectedCheckBox([]);
      setSelectedCheckBox([...selectedCheckBox.filter(id => !rowsData.map((n) => n.user_id).includes(id))]);

    }
  };

  const handleCheckboxClick = (event, row) => {
    const userId = row.user_id;
    let newSelected = [];

    if (selectedCheckBox.includes(userId)) {
      newSelected = selectedCheckBox.filter((id) => id !== userId);
    } else {
      newSelected = [...selectedCheckBox, userId];
    }
    setSelectedCheckBox(newSelected);
  };

  const handleSwitchChange = async (event, row) => {
    const userId = row.user_id;
    const newControlValue = event.target.checked;
    const toaggleAction = newControlValue ? "enable" : "disable";
    const toggleReqBody = { action: toaggleAction, user_id: `${userId}` };

    // toggleUserAPI(toggleReqBody);
    setIsLoading(true);
    try {
      const response = await toggleUserAPI(toggleReqBody);
      if (response.status_code === 200) {
        // setRowsData((prevRowsData) =>
        //   prevRowsData.map((prevRow) =>
        //     prevRow.user_id === userId ? { ...prevRow, control: newControlValue } : prevRow
        //   )
        // );
        GetTableData();
      }
    } catch (error) {
      console.error("Error toggling user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableSelectedRows = async () => {
    if (selectedCheckBox.length === 0) {
      showNotification("Please select at least one user to enable.", "warning");
      return;
    }
    const invalidUsers = selectedCheckBox.filter(userId => {
      const user = rowsData.find(row => row.user_id === userId);
      return user && user.customer_status === false;
    });
  
    if (invalidUsers.length > 0) {
      showNotification("Cannot enable selected users.", "warning");
      return;
    }

    const enableReqBody = {
      action: "enable",
      user_id: selectedCheckBox,
    };

    try {
      const response = await enableUserAPI(enableReqBody);
      if (response.status_code === 200) {
        // const updatedRowsData = rowsData.map((row) => {
        //   if (selectedCheckBox.includes(row.user_id)) {
        //     return {
        //       ...row,
        //       control: true, // Assuming control becomes true when the user is enabled
        //     };
        //   }
        //   return row;
        // });

        // setRowsData(updatedRowsData);
        GetTableData();
        setSelectedCheckBox([]);
        showNotification("Selected users have been enabled.", "success");
      } else {
        showNotification("Error enabling users: " + response.message, "error");
      }
    } catch (error) {
      showNotification("An error occurred while enabling users.", "error");
    }
  };

  const handleDisableSelectedRows = async () => {
    if (selectedCheckBox.length === 0) {
      showNotification(
        "Please select at least one user to disable.",
        "warning"
      );
      return;
    }
    const invalidUsers = selectedCheckBox.filter(userId => {
      const user = rowsData.find(row => row.user_id === userId);
      return user && user.customer_status === false;
    });
  
    if (invalidUsers.length > 0) {
      showNotification("Cannot disable selected users .", "warning");
      return;
    }
  

    const disableReqBody = {
      action: "disable",
      user_id: selectedCheckBox,
    };

    try {
      const response = await disableUserAPI(disableReqBody);
      if (response.status_code === 200) {
        // const updatedRowsData = rowsData.map((row) => {
        //   if (selectedCheckBox.includes(row.user_id)) {
        //     return {
        //       ...row,
        //       control: true, // Assuming control becomes true when the user is enabled
        //     };
        //   }
        //   return row;
        // });

        // setRowsData(updatedRowsData);
        GetTableData();
        setSelectedCheckBox([]);
        showNotification("Selected users have been disabled.", "success");
      } else {
        showNotification("Error disabling users: " + response.message, "error");
      }
    } catch (error) {
      showNotification("An error occurred while disabling users.", "error");
    }
  };

  const handleEditUserModalOpen = (row) => {
    const originalRow = rowsData.find((r) => r.user_id === row.user_id);
    const rowWithCompanyName = {
      ...row,
      customer_name: originalRow?.customer_name || "",
    };

    setSelectedUser(rowWithCompanyName);
    setEditMode(true);
    setIsAddUserOpen(true);
    // setIsEditUserModalOpen(true);
  };
  const checkRoleAndDisplayCompanyName = () => {
    const rolesWithColumnFilter = [
      roleEnum.XT_ADMIN,
      roleEnum.XT_ADVANCE_USER,
      roleEnum.XT_STANDARD_USER,
    ];

    const shouldFilter = rolesWithColumnFilter.includes(userRole);

    if (shouldFilter) {
      setFilteredColumns(columns);
      setFilteredRows(rowsData);
    } else {
      setFilteredColumns(columns.filter((col) => col.id !== "customer_name"));
      const filteredUsers = rowsData.map(({ customer_name, ...rest }) => rest);
      setFilteredRows(filteredUsers);
    }
  };

  useEffect(() => {
    checkRoleAndDisplayCompanyName();
  }, [userRole, rowsData]);
  return (
    <div>
      <Grid container className="user-list" sx={{ overflow: "auto" }}>
        <Grid item xs={12} className="user-info">
          <h2>Registered User List</h2>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            justifyContent: "space-between",
            backgroundColor: "#F7F9FB",
          }}
        >
          <div className="user-list-view">
            <div>
              <Button
                className="add-button"
                size="medium"
                onClick={handleAddUserOpen}
              >
                <PlusIcon /> Add
              </Button>
              <Button className="delete-button" onClick={handleDeleteUserOpen}>
                {" "}
                <MinusIcon sx={{ marginBottom: "5px" }} />
                <div> Delete</div>
              </Button>
              <Button
                // disabled={selectedCheckBox.some(userId => {
                //   const user = rowsData.find(row => row.user_id === userId);
                //   return user && user.customer_status === false;
                // })}
                className="enable-button"
                onClick={handleEnableSelectedRows}
              >
                <EnableIcon /> Enable
              </Button>
              <Button
              // disabled={selectedCheckBox.some(userId => {
              //   const user = rowsData.find(row => row.user_id === userId);
              //   return user && user.customer_status === false;
              // })}
                className="disable-button"
                onClick={handleDisableSelectedRows}
              >
                <DisableIcon /> Disable
              </Button>
            </div>

            <span>
              <TextField
                className="search-field"
                variant="outlined"
                size="small"
                placeholder="Search"
                onChange={handleInputChange}
                value={searchText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon onClick={handleSearch} />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                style={{ backgroundColor: "F7F9FB" }}
              />
            </span>
          </div>
        </Grid>
        {/*Table Data*/}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <div className="table-div" style={{ position: 'relative' }}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                border: "none",
                elevation: "0",
              }}
            >
              <TableContainer sx={{ maxHeight: 440, border: "none" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className="user-grp-table"
                >
                  <TableHead>
                    <TableRow>
                      {filteredColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{
                            minWidth: "10px",
                            border: "none",
                            textAlign: "left",
                            alignItems: "center",
                          }}
                        >
                          {column.type === "checkbox" ? (
                            <Checkbox
                              style={{ marginLeft: "9px" }}
                              indeterminate={
                                selectedCheckBox.length > 0 &&
                                checkSomeSelected(selectedCheckBox, rowsData, 'user_id')
                              }
                              checked={
                                rowsData.length > 0 &&
                                checkAllSelected(selectedCheckBox, rowsData, 'user_id')
                              }
                              onChange={handleSelectAllClick}
                            />
                          ) : (
                            <TableSortLabel
                              classes={{
                                root: "customSortLabel",
                              }}
                              active={orderBy === column.id}
                              direction={orderBy === column.id ? order : "asc"}
                              onClick={createSortHandler(column.id)}
                              IconComponent={SortIcon}
                            >
                              {column.label}
                            </TableSortLabel>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.length > 0 ? (
                      filteredRows.map((row) => {
                        const isItemSelected =
                          selectedCheckBox.indexOf(row.name) !== -1;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            {filteredColumns.map((column) => {
                              const value =
                                column.id === "first_name"
                                  ? `${row.first_name} ${row.last_name}`
                                  : row[column.id];

                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    color:
                                        ((column.id === "config_count" || column.id === "group_count" || column.id === "tcu_count" ) && row.account_status)
                                            ? "blue"
                                            : "black",
                                    cursor:
                                        ((column.id === "config_count" || column.id === "group_count" || column.id === "tcu_count" ) && row.account_status)
                                        ? "pointer"
                                        : "default",
                                    fontSize:"12px",
                                    fontWeight:"500"
                                  }}
                                  onClick={
                                    column.id === "first_name"
                                      ? () => handleEditUserModalOpen(row)
                                      :(column.id === "config_count" && row.account_status)
                                            ? () => handleAssociatedConfigsClick(row)
                                      : (column.id === "group_count" && row.account_status)
                                      ? () =>
                                          handleAssociateUserGroupModalOpen(row)
                                      : (column.id === "tcu_count" && row.account_status)
                                      ? () => handleAssociatedTcuModelOpen(row)
                                      : undefined
                                  }
                                >
                                  {column.id === "first_name" ? (
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        gap: "8px",
                                      }}
                                    >
                                      <UserListUserIcon
                                        style={{ paddingLeft: "18px" }}
                                      />
                                      {value}
                                    </Box>
                                  ) : column.id === "account_status" ? (
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      style={{ gap: "8px" }}
                                    >
                                      <Switch
                                        checked={row.account_status}
                                        onChange={(event) =>
                                          handleSwitchChange(event, row)
                                        }
                                        disabled={isLoading || row.customer_status === true ? false :true}
                                        sx={{
                                          "& .MuiSwitch-switchBase.Mui-checked":
                                            {
                                              color: "#E87423",
                                            },
                                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                            {
                                              backgroundColor: "#E87423",
                                            },
                                        }}
                                      />
                                      <span>
                                        {row.account_status
                                          ? "Enable"
                                          : "Disable"}
                                      </span>
                                    </Box>
                                  ) : column.type === "checkbox" ? (
                                    <Checkbox
                                      checked={selectedCheckBox.includes(
                                        row.user_id
                                      )} // Check if this user_id is selected
                                      onClick={(event) =>
                                        handleCheckboxClick(event, row)
                                      }
                                    />
                                  ) : column.id === "last_login_date" ? (
                                    formatDate(row.last_login_date)
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={columns.length}>
                          {isLoading ? (
                            <h3 style={{ textAlign: "center" }}>
                              Fetching Data
                            </h3>
                          ) : (
                            <h3 style={{ textAlign: "center" }}>
                              No Data Found
                            </h3>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
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
            {isLoading && <BlockLoader isLoading={isLoading} />}
          </div>
        </Grid>

        {/* Add User Modal */}
        {isAddUserOpen && (
          <AddEditUserModal
            open={isAddUserOpen}
            onClose={handleAddUserClose}
            GetTableData={GetTableData}
            editMode={editMode}
            user={selectedUser}
            getCustomerListSelect={getCustomerListSelect}
            getUserRolesSelect={getUserRolesSelect}
            companyList={companyList}
            userRoles={userRoles}
          />
        )}

        {isAssociatedConfigModalOpen && (
          <AssociatedConfigsDialog
            open={isAssociatedConfigModalOpen}
            onClose={() => setIsAssociatedConfigModalOpen(false)}
            userId={userId}
          />
        )}

        {isAssociateUserGroupModal && (
          <AssociateUserGroupModal
            open={isAssociateUserGroupModal}
            onClose={() => setIsAssociateUserGroupModal(false)}
            userId={userId}
          />
        )}

        {isAssociatedTcuModelOpen && (
          <AssociatedTcuModal
            open={isAssociatedTcuModelOpen}
            onClose={() => setIsAssociatedTcuModelOpen(false)}
            userId={userId}
          />
        )}

        {isDeleteUserOpen && (
          <DeleteUserModal
            open={isDeleteUserOpen}
            handleClose={handleDeleteUserClose}
            usersToDelete={usersToDelete}
            GetTableData={GetTableData}
          />
        )}
      </Grid>
    </div>
  );
};

export default UserList;
