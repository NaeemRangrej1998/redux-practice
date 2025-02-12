import React, { useEffect, useState } from "react";
import "./styles/userGroupListing.scss";
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  TableSortLabel,
  Box,
  Pagination,
} from "@mui/material";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import PlusIcon from "../../../../../assets/icons/PlusIcon";
import MinusIcon from "../../../../../assets/icons/MinusIcon";
import UsersThree from "../../../../../assets/icons/UsersThree";
import UserCircleIcon from "../../../../../assets/icons/UserCircleIcon";
import UserCirleBlack from "../../../../../assets/icons/UserCirleBlack";
import AddNewUserGroup from "./AddEditNewUserGroup";
import AssociatedConfigsDialog from "./AssociatedConfigsDialog";
import DeleteUserGroup from "./DeleteUserGroup";
import SortIcon from "../../../../../assets/icons/SortIcon";
import BlockLoader from "../../../../../shared/components/Loader/BlockLoader";
import { getUserGroupList } from "../../../../../api/user/userGroup.api";
import showNotification from "../../../../../shared/helpers/notification";
import { formatDate } from "../../../../../shared/helpers/dateFormat";
import AssociatedConfigModal from "./AssociatedConfigModal";
import { useSelector } from "react-redux";
import roleEnum from "../../../../../enums/role.enum";
import {checkAllSelected, checkSomeSelected} from "../../../../../shared/helpers/table.util";

const columns = [
  { id: "select", label: "", type: "checkbox" }, // Checkbox column
  { id: "user_group_name", label: "Name" },
  { id: "user_count", label: "User Count" },
  { id: "config_count", label: "Associated Configs" },
  { id: "customer_name", label: "Company Name" },
  { id: "last_modified_date", label: "Last Modified Date" },
  { id: "last_modified_by", label: "Last Modified By" },
  { id: "created_by", label: "Created By" },
];

const UserGroupListing = () => {
  const [isUserGroupModalOpen, setIsUserGroupModalOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserGroupEdit, setSelectedUserGroupEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);
  const [isOpenAssociatedConfigsModal, setIsOpenAssociatedConfigsModal] =
    useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [userGroupToDelete, setUserGroupToDelete] = useState([]);
  const [userGroupId, setUserGroupId] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [filteredRows, setFilteredRows] = useState([]);

  const userRole = useSelector((state) => state.auth.role);

  const getUserListTableData = () => {
    const params = {
      search_term: searchQuery,
      page: page,
      page_size: rowsPerPage,
      sort_field: orderBy,
      sort_order: order,
    };
    setIsLoading(true);
    getUserGroupList(params)
      .then((response) => {
        setRowsData(response.data.user_groups);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  useEffect(() => {
    getUserListTableData();
  }, [page, rowsPerPage, orderBy, order, searchQuery]);

  const handleSearchChange = (event) => {
    setPage(1)
    const value = event.target.value;
    setSearchQuery(value);
    getUserListTableData();
  };

  const handleAssociatedConfigsClick = (row) => {
    setIsOpenAssociatedConfigsModal(true);
    setUserGroupId(row.user_group_id);
  };

  const handleDeleteClick = () => {
    if (selectedCheckBox.length === 0) {
      showNotification("Please select at least one user to delete.", "warning");
    } else {
      setUserGroupToDelete(selectedCheckBox);
      setOpenDeleteDialog(true);
    }
  };

  const handleOpenAddUserGroupDialog = () => {
    setIsUserGroupModalOpen(true);
    setEditMode(false);
    setSelectedUserGroupEdit(null);
  };

  const handleUserGroupNameClick = (row) => {
    setSelectedUserGroupEdit({
      ...row,
      userGroupId: row.user_group_id || [],
    });
    setEditMode(true);
    setIsUserGroupModalOpen(true);
  };

  const handleClose = () => {
    setIsUserGroupModalOpen(false);
    getUserListTableData();
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedCheckBox([])
    getUserListTableData();
  };

  const handleDeleteConfirm = () => {
    const newRowsData = rowsData.filter(
      (row) => !selectedCheckBox.includes(row.name)
    );
    setRowsData(newRowsData);
    setSelectedCheckBox([]);
    setOpenDeleteDialog(false);
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
      const newSelected = rowsData.map((n) => n.user_group_id);
      setSelectedCheckBox([...new Set([...selectedCheckBox, ...newSelected])]);
      return;
    }
    // setSelectedCheckBox([]);
    setSelectedCheckBox([...selectedCheckBox.filter(id => !rowsData.map((n) => n.user_group_id).includes(id))]);

  };

  const handleCheckboxClick = (event, row) => {
    const userId = row.user_group_id;
    let newSelected = [];

    if (selectedCheckBox.includes(userId)) {
      newSelected = selectedCheckBox.filter((id) => id !== userId);
    } else {
      newSelected = [...selectedCheckBox, userId];
    }

    setSelectedCheckBox(newSelected);
  };

  return (
    <div>
      <Grid container style={{ width: "100%" }} className="grid-container">
        <Grid item xs={12}>
          <h2 className="heading-left">User Group List</h2>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            justifyContent: "space-between",
            backgroundColor: "#F7F9FB",
          }}
        >
          <div className="container-two">
            <div>
              <Button
                className="add-button"
                size="medium"
                onClick={handleOpenAddUserGroupDialog}
              >
                <PlusIcon /> Add
              </Button>
              <Button className="delete-button" onClick={handleDeleteClick}>
                <MinusIcon sx={{ marginBottom: "2px" }} /> <div> Delete</div>
              </Button>
            </div>

            <span className="search-container">
              <TextField
                className="search-field"
                variant="outlined"
                size="small"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "#F7F9FB" }}
              />
            </span>
          </div>
        </Grid>
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
                  sx={{
                    borderCollapse: "collapse",
                    borderLeft: "none",
                    borderRight: "none",
                    "& .MuiTableCell-root": {
                      borderLeft: "none",
                      borderRight: "none",
                    },
                  }}
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
                                  checkSomeSelected(selectedCheckBox, rowsData, 'user_group_id')
                              }
                              checked={
                                rowsData.length > 0 &&
                                  checkAllSelected(selectedCheckBox, rowsData, 'user_group_id')
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
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    // width: "auto",
                                    color:
                                      column.id === "associated-configs" ||
                                      column.id === "config_count"
                                        ? "blue"
                                        : "inherit",
                                    cursor:
                                      column.id === "associated-configs" ||
                                      column.id === "config_count"
                                        ? "pointer"
                                        : "default",
                                  }}
                                  onClick={
                                    column.id === "user_group_name"
                                      ? () => handleUserGroupNameClick(row)
                                      : column.id === "config_count"
                                      ? () => handleAssociatedConfigsClick(row)
                                      : undefined
                                  }
                                >
                                  {column.id === "user_group_name" ? (
                                    // Render UsersThreeIcon along with the name value
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        gap: "8px",
                                      }}
                                    >
                                      <UsersThree
                                        style={{ paddingLeft: "18px" }}
                                      />{" "}
                                      {value}
                                    </Box>
                                  ) : column.id === "created_by" ? (
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      style={{ gap: "8px" }}
                                    >
                                      <UserCirleBlack
                                        style={{
                                          paddingLeft: "8px",
                                        }}
                                      />{" "}
                                      {value}
                                    </Box>
                                  ) : column.type === "checkbox" ? (
                                    <Checkbox
                                      checked={selectedCheckBox.includes(
                                        row["user_group_id"]
                                      )}
                                      onClick={(event) =>
                                        handleCheckboxClick(event, row)
                                      }
                                    />
                                  ) : column.id === "last_modified_date" ? (
                                    formatDate(row.last_modified_date)
                                  ) : column.id === "last_modified_date" ? (
                                    formatDate(row.last_modified_date)
                                  ) : column.id === "config_count" ? (
                                    row.config_count === "" ||
                                    row.config_count === null ? (
                                      "0"
                                    ) : (
                                      value
                                    )
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
                        <TableCell
                          align="center"
                          colSpan={filteredColumns.length}
                        >
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
      </Grid>
      {isUserGroupModalOpen && (
        <AddNewUserGroup
          open={isUserGroupModalOpen}
          onClose={handleClose}
          editModeData={selectedUserGroupEdit}
          editMode={editMode}
        />
      )}
      {isOpenAssociatedConfigsModal && (
        <AssociatedConfigModal
          open={isOpenAssociatedConfigsModal}
          onClose={() => setIsOpenAssociatedConfigsModal(false)}
          groupId={userGroupId}
        />
      )}
      {openDeleteDialog && (
        <DeleteUserGroup
          open={openDeleteDialog}
          onClose={handleDeleteClose}
          userGroupToDelete={userGroupToDelete}
        />
      )}
    </div>
  );
};

export default UserGroupListing;
