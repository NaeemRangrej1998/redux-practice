import React, { useEffect, useState } from "react";
// import "./styles/userGroupListing.scss";
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

import SortIcon from "../../../../../assets/icons/SortIcon";
import { Padding } from "@mui/icons-material";
import UsersIconBlack from "../../../../../assets/icons/UsersIconBlack";
import AssociatedUsersTcuDialog from "./AssociatedUsersTcuDialog";
import DeleteUserAssociation from "./DeleteUserAssociation";
import AssociatedTcuDialog from "./AssociatedTcuDialog";
import AddNewTcuUserAssociation from "./AddEditNewTcuUserAssociation";
import ModifyUserGroup from "./ModifyUserGroup";
import { getTcuAssociationList } from "../../../../../api/tcuAssociation/tcuAssociation.api";
import { formatDate } from "../../../../../shared/helpers/dateFormat";
import showNotification from "../../../../../shared/helpers/notification";
import InfiniteScroll from "react-infinite-scroll-component";
import BlockLoader from "../../../../../shared/components/Loader/BlockLoader";
import roleEnum from "../../../../../enums/role.enum";
import {useSelector} from "react-redux";
import {checkAllSelected, checkSomeSelected} from "../../../../../shared/helpers/table.util";

const columns = [
  { id: "select", label: "", type: "checkbox" },
  { id: "tcu_config_name", label: "Name" },
  { id: "user_count", label: "User" },
  { id: "tcu_count", label: "TCU" },
  { id: 'customer_name', label: 'Company Name' },
  { id: "last_modified_date", label: "Last Modified Date and Time" },
  { id: "last_modified_by", label: "Modified By" },
  { id: "created_by", label: "Created By" },
];

const TcuAssociationListing = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editModeData, setEditModeData] = useState(null);
  const [selectedRowsData, setSelectedRowsData] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]); // State for selected checkboxes

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = useState([]); // State for selected checkboxes
  const [openAssociatedUsersDialog, setOpenAssociatedUsersDialog] =
    useState(false); // State to manage Associated Configs dialog

  const [rowsData, setRowsData] = useState([]);
  const [associatedUsersData, setAssociatedUsersData] = useState([]);
  const [associatedTcuData, setAssociatedTcuData] = useState([]);
  const [openAssociatedTcuDialog, setOpenAssociatedTcuDialog] = useState(false);
  const [openModifyGroup, setOpenModifyGroup] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [tcuAssociationToDelete, setTcuAssociationToDelete] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isAddTcuUserAssociationOpen, setIsAddTcuUserAssociationOpen] =
    useState(false);
  const [selectedTcu, setSelectedTcu] = useState(null);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [filteredRows, setFilteredRows] = useState([]);
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (isSearch) {
      GetTableData();
    }
  }, [isSearch]);
  useEffect(() => {
    GetTableData();
  }, [page, rowsPerPage, orderBy, order, searchText]);

  const GetTableData = () => {
    setIsLoading(true);

    const params = {
      search_term: searchText.trim(),
      page: page,
      page_size: rowsPerPage,
      sort_field: orderBy,
      sort_order: order,
    };

    getTcuAssociationList(params)
      .then((response) => {
        setRowsData(response.data.tcu_configs);
        setTotalPages(response.data.total_pages);
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
      GetTableData();
    }
  };
  const handleSearch = (searchTerm) => {
    setIsSearch(false);
    if (searchTerm === undefined) {
      getTcuAssociationList();
      return;
    } else {
      setPage(1)
      const params = {
        search_term: searchTerm.trim(),
        page:page
      };
      getTcuAssociationList(params)
        .then((response) => {
          setRowsData(response.data.tcu_configs);
        })
        .catch((error) => {
          console.error("Error fetching unit list:", error);
        });
    }
  };

  const handleAssociatedUsersDialog = (row) => {
    setAssociatedUsersData(row);
    setOpenAssociatedUsersDialog(true);
  };
  const handleAssociatedTcuDialog = (row) => {
    setAssociatedTcuData(row);
    setOpenAssociatedTcuDialog(true);
  };
  const handleDeleteOpen = () => {
    if (selectedCheckBox.length === 0) {
      showNotification("Please select at least one user to delete.", "warning");
    } else {
      setTcuAssociationToDelete(selectedCheckBox); // Set the users to delete
      setIsDeleteOpen(true); // Open the confirmation modal
    }
  };
  const handleUserNameClick = (row) => {
    // setSelectedRowsData(row);
    // setOpenModifyGroup(true);

    // setSelectedUser(row);
    setSelectedTcu(row);

    setEditMode(true);
    setIsAddTcuUserAssociationOpen(true);
    // setIsEditUserModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const newRowsData = rowsData.filter((row) => !selected.includes(row.name));
    setRowsData(newRowsData);
    setSelected([]);
    setOpenDeleteDialog(false);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setSelectedCheckBox([])
  };

  const handleUserGroupNameClick = (row) => {
    setEditModeData(row);
    setOpenDialog(true);
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
      const newSelected = rowsData.map((n) => n.tcu_id); // Use unique identifiers
      setSelectedCheckBox([...new Set([...selectedCheckBox, ...newSelected])]);
    } else if (event.target.indeterminate) {
      setSelectedCheckBox([]);
    } else {
      // setSelectedCheckBox([]);
      setSelectedCheckBox([...selectedCheckBox.filter(id => !rowsData.map((n) => n.tcu_id).includes(id))]);

    }
  };

  const handleOpenAddUserGroupDialog = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCheckboxClick = (event, row) => {
    const tcuId = row.tcu_id;
    let newSelected = [];

    if (selectedCheckBox.includes(tcuId)) {
      newSelected = selectedCheckBox.filter((id) => id !== tcuId);
    } else {
      newSelected = [...selectedCheckBox, tcuId];
    }

    setSelectedCheckBox(newSelected);
  };
  const handleAddTcuUserAssociationClose = () => {
    setIsAddTcuUserAssociationOpen(false);
  };

  const handleAddTcuUserAssociationOpen = (row) => {
    setIsAddTcuUserAssociationOpen(true);
    setEditMode(false);
    setSelectedTcu(null);
  };

  const checkRoleAndDisplayCompanyName = () => {
    let cols = columns;
    const rolesWithColumnFilter = [roleEnum.XT_ADMIN, roleEnum.XT_ADVANCE_USER, roleEnum.XT_STANDARD_USER];

    const shouldFilter = rolesWithColumnFilter.includes(userRole);
    const hasRowsData = rowsData.length > 0;

    if (shouldFilter && hasRowsData) {
      //   setFilteredColumns(columns);
      cols = columns;
      setFilteredRows(rowsData);
    } else {
      cols = cols.filter((col) => col.id !== 'customer_name');
      const filteredUsers = rowsData.map(({ customer_name, ...rest }) => rest);
      setFilteredRows(filteredUsers);
    }
    setFilteredColumns([...cols]);
  };
  useEffect(() => {
    checkRoleAndDisplayCompanyName();
  }, [userRole, rowsData]);

  return (
    <div>
      <Grid container style={{ width: "100%", overflow:"auto"} } className="grid-container">
        <Grid item xs={12}>
          <h2 className="heading-left">User - TCU Association List</h2>
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
              <Button className="add-button" size="medium" onClick={handleAddTcuUserAssociationOpen}>
                <PlusIcon/> Add
              </Button>
              <Button
                  className="delete-button"
                  onClick={handleDeleteOpen}
              >
                {" "}
                <MinusIcon sx={{marginBottom: "5px"}}/>
                <div> Delete</div>
              </Button>
            </div>

            <span className="search-container">
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
                            alignItems: "center"
                        }}
                        >
                          {column.type === "checkbox" ? (
                            <Checkbox
                              style={{marginLeft: '9px'}}
                              indeterminate={
                                selectedCheckBox.length > 0 &&
                                  checkSomeSelected(selectedCheckBox, rowsData, 'tcu_id')
                              }
                              checked={
                                rowsData.length > 0 &&
                                  checkAllSelected(selectedCheckBox, rowsData, 'tcu_id')
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
                          selected.indexOf(row.name) !== -1;
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
                                      column.id === "associated-configs"
                                        ? "blue"
                                        : column.id === "user_count" ||
                                          column.id === "tcu_count"
                                        ? "blue"
                                        : "inherit",
                                    cursor:
                                      column.id === "associated-configs"
                                        ? "pointer"
                                        : column.id === "tcu_count" ||
                                          column.id === "user_count"
                                        ? "pointer" // Add cursor pointer for 'user' as well
                                        : "default",
                                    fontSize:"12px",
                                    fontWeight:"500"

                                  }}
                                  onClick={
                                    column.id === "tcu_config_name"
                                      ? () => handleUserNameClick(row)
                                      : column.id === "user_count"
                                      ? () => handleAssociatedUsersDialog(row)
                                      : column.id === "tcu_count"
                                      ? () => handleAssociatedTcuDialog(row)
                                      : undefined
                                  } // Add onClick here
                                >
                                  {column.id === "tcu_config_name" ? (
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
                                      <UsersIconBlack
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
                                        row.tcu_id
                                      )} // Check if this user_id is selected
                                      onClick={(event) =>
                                        handleCheckboxClick(event, row)
                                      }
                                    />
                                  ) : column.id === "last_modified_date" ? (
                                    formatDate(row.last_modified_date)
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
                        {isLoading ? <h3 style={{textAlign:"center"}}>Fetching Data</h3>:   <h3 style={{textAlign:"center"}}>No Data Found</h3>}
                        
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
      {openAssociatedUsersDialog && (
        <AssociatedUsersTcuDialog
          open={openAssociatedUsersDialog}
          onClose={() => setOpenAssociatedUsersDialog(false)}
          associatedUsersData={associatedUsersData}
        />
      )}
      {openAssociatedTcuDialog && (
        <AssociatedTcuDialog
          open={openAssociatedTcuDialog}
          onClose={() => setOpenAssociatedTcuDialog(false)}
          associatedTcuData={associatedTcuData}
        />
      )}
      <DeleteUserAssociation
        open={isDeleteOpen}
        handleClose={handleDeleteClose}
        tcuAssociationToDelete={tcuAssociationToDelete}
        GetTableData={GetTableData}
      />{" "}
      {isAddTcuUserAssociationOpen && (
        <AddNewTcuUserAssociation
          open={isAddTcuUserAssociationOpen}
          onClose={handleAddTcuUserAssociationClose}
          GetTableData={GetTableData}
          editMode={editMode}
          tcu={selectedTcu}
        />
      )}
      {/* <ModifyUserGroup
        open={openModifyGroup}
        rowsData={rowsData}
        onClose={() => setOpenModifyGroup(false)}
      /> */}

    </div>
  );
};

export default TcuAssociationListing;
