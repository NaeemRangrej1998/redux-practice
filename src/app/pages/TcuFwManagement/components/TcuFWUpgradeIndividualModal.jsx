import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SortIcon from "../../../../assets/icons/SortIcon";
import "../style/upgradeFwList.scss";
import { updateFwDataApi } from "../../../../api/tcuFwManagement/fw-api";
import BlockLoader from "../../../../shared/components/Loader/BlockLoader";
import showNotification from "../../../../shared/helpers/notification";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import roleEnum from "../../../../enums/role.enum";

function convertGroupResponse(selectedGroups) {
  let tcus = [];
  selectedGroups.forEach((grp, index) => {
    tcus.push({
      ...grp,
      tcu_alias_name: grp.tcu_group_name,
      index: index + 1,
    });
    grp.tcus.forEach((tcu) => {
      tcus.push(tcu);
    });
  });
  return tcus;
}

function covertTcuResponse(selectedTCUs) {
  return selectedTCUs.map((item, index) => ({ ...item, index: index + 1 }));
}

const TcuFWUpgradeIndividualModal = ({
  open,
  handleCloseTcuFWUpgradeIndividual,
  selectedTcus,
  selectedTcuGroups,
  selectedFw,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isEnable, setIsEnable] = useState(false);


  const columns = [
    { id: "index", label: "#" },
    { id: "tcu_alias_name", label: "TCU Name" },
    { id: "serial_number", label: "Serial Number" },
    { id: "imei_number", label: "IMEI Number" },
    { id: "vin_number", label: "VIN" },
    { id: "vehicle_number_plate", label: "Number Plate" },
  ];

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const confirmUpdate = () => {
    let data = {
      tcu_list: selectedTcus.map((item) => item.tcu_id),
      tcu_group_list: selectedTcuGroups?.map((item) => item.tcu_group_id),
      fw_version: selectedFw.firmware_version,
      fw_file_name: selectedFw.firmware_file_name,
      customer_id: selectedFw.customer_id,
    };

    setIsEnable(true);
    updateFwDataApi(data).then((response) => {
      setIsLoading(true);
      if (response.status_code === 200) {
        setIsLoading(false);
        setIsEnable(false);
        handleCloseTcuFWUpgradeIndividual();
        showNotification(response.message);
        navigate("/tcu-fw-management/tcu-upgrade-history");
      }
    });
  };

  const renderIndividualTable = (rowData, title) => (
    <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 2 }}>
      <h3>{title}</h3>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" className="tcu-table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell

                  key={column.id}
                  sx={{
                    minWidth: "10px",
                    border: "none",
                    alignItems: "right",
                    cursor: "default",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}>



                  {column.id === "id" || column.id === "index" ? (
                    column.label
                  ) : (
                    <TableSortLabel
                    classes={{ root: "customSortLabel" }}
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() =>
                      handleRequestSort(
                        column.id,
                        setOrder,
                        setOrderBy,
                        orderBy,
                        order
                      )
                    }
                    sx={{ "& .MuiTableSortLabel-icon": { display: "none" } }}
                    // IconComponent={SortIcon}
                  >
                    {column.label}
                  </TableSortLabel>
                  )}
                </TableCell>
              ))}
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.length > 0 ? (
              rowData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  return (
    <Dialog
      open={open}
      onClose={handleCloseTcuFWUpgradeIndividual}
      className="upgrade-fw-list"
    >
      <Grid container>
        {/*<DialogTitle style={{display:"flex",justifyContent:"flex-start"}}></DialogTitle>*/}

        <DialogContent>
          <div style={{ paddingLeft: "3px" }}>
            <h2>Are you sure to Upgrade Firmware on Following TCUs?</h2>
          </div>
          <div style={{ paddingLeft: "3px" }}>
            <h3>Upgrade Details:</h3>
          </div>
          <div style={{ paddingLeft: "3px" }}>
            FW File Name:{" "}
            <span style={{ color: "#E87423" }}>
              {selectedFw.firmware_file_name}
            </span>{" "}
            &nbsp;&nbsp; Version:{" "}
            <span style={{ color: "#E87423" }}>
              {selectedFw.firmware_version}
            </span>
          </div>
          <div style={{ paddingLeft: "3px" }}>
            <p>
              <b>Note:</b> TCU Firmware upgrade status will be displayed on TCU
              Firmware upgrade history page.
            </p>
          </div>
          <Grid
            container
            style={{ overflow: "auto" }}
            className="grid-container"
          >
            <Grid item xs={12}>
              <div className="table-div">
                {selectedTcus &&
                  selectedTcus.length > 0 &&
                  renderIndividualTable(
                    covertTcuResponse(selectedTcus),
                    "Selected TCUs"
                  )}
                {selectedTcuGroups &&
                  selectedTcuGroups.length > 0 &&
                  renderIndividualTable(
                    convertGroupResponse(selectedTcuGroups),
                    "Selected TCU Groups"
                  )}

                {/*{renderGroupTable()}*/}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          <Button
            onClick={handleCloseTcuFWUpgradeIndividual}
            variant="contained"
            size="large"
            className="cancel-button"
            style={{ marginRight: "15px" }}
          >
            Cancel
          </Button>
          <Button onClick={confirmUpdate} variant="contained" size="large" disabled={isEnable}>
            {isEnable ? (<CircularProgress
              style={{
                color: '#fff',
                marginRight: '5px'
              }} size={18} />) : null}
            Confirm
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default TcuFWUpgradeIndividualModal;
