import React, {useEffect, useState} from "react";
import {
    Checkbox,
    Grid,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Switch
} from "@mui/material";
import SortIcon from "../../../assets/icons/SortIcon";
import UserListUserIcon from "../../../assets/icons/UserListUserIcon";
import {Box} from "@mui/system";

const columns = [
    {id: "select", label: "", type: "checkbox"},
    {id: "company_name", label: "Company Name"},
    {id: "address_line_one", label: "Address"},
    {id: "contact_person_name", label: "Contact Person Name"},
    {id: "contact_person_email", label: "Contact Person Email"},
    {id: "customer_status", label: "Control"},
];

const MuiTable = () => {

    const [rowsData, setRowsData] = useState([
        {
            company_name: "KT",
            address_line_one: "90 Bullgong-ro, Seongnam-city, Korea",
            contact_person_name: "Max Craig",
            contact_person_email: "max@kt.com",
            customer_status: true,  // ✅ Use true instead of "Enable"
        },
        {
            company_name: "Alt Box",
            address_line_one: "Deshmoret e Kombit Blvd, Albania",
            contact_person_name: "Melody Morrison",
            contact_person_email: "melody@altbox.com",
            customer_status: true,
        },
        {
            company_name: "Dellito",
            address_line_one: "George Ohm Street, Sao Paulo, Brazil",
            contact_person_name: "Drew Cano",
            contact_person_email: "sean@delilto.com",
            customer_status: true,
        },
        {
            company_name: "Exchange",
            address_line_one: "Hillview Ave, Palo Alto, California",
            contact_person_name: "Brian Diggs",
            contact_person_email: "brian@exchange.com",
            customer_status: true,
        },
        {
            company_name: "KPMG",
            address_line_one: "Mission College Blvd, United States",
            contact_person_name: "Smith Lane",
            contact_person_email: "smith@kpmg.com",
            customer_status: false, // ✅ Use false instead of "Disable"
        },
        {
            company_name: "KT",
            address_line_one: "90 Bullgong-ro, Seongnam-city, Korea",
            contact_person_name: "Max Craig",
            contact_person_email: "max@kt.com",
            customer_status: true,  // ✅ Use true instead of "Enable"
        },
        {
            company_name: "Alt Box",
            address_line_one: "Deshmoret e Kombit Blvd, Albania",
            contact_person_name: "Melody Morrison",
            contact_person_email: "melody@altbox.com",
            customer_status: true,
        },
        {
            company_name: "Dellito",
            address_line_one: "George Ohm Street, Sao Paulo, Brazil",
            contact_person_name: "Drew Cano",
            contact_person_email: "sean@delilto.com",
            customer_status: true,
        },
        {
            company_name: "Exchange",
            address_line_one: "Hillview Ave, Palo Alto, California",
            contact_person_name: "Brian Diggs",
            contact_person_email: "brian@exchange.com",
            customer_status: true,
        },
        {
            company_name: "KPMG",
            address_line_one: "Mission College Blvd, United States",
            contact_person_name: "Smith Lane",
            contact_person_email: "smith@kpmg.com",
            customer_status: false, // ✅ Use false instead of "Disable"
        },
        {
            company_name: "KT",
            address_line_one: "90 Bullgong-ro, Seongnam-city, Korea",
            contact_person_name: "Max Craig",
            contact_person_email: "max@kt.com",
            customer_status: true,  // ✅ Use true instead of "Enable"
        },
        {
            company_name: "Alt Box",
            address_line_one: "Deshmoret e Kombit Blvd, Albania",
            contact_person_name: "Melody Morrison",
            contact_person_email: "melody@altbox.com",
            customer_status: true,
        },
        {
            company_name: "Dellito",
            address_line_one: "George Ohm Street, Sao Paulo, Brazil",
            contact_person_name: "Drew Cano",
            contact_person_email: "sean@delilto.com",
            customer_status: true,
        },
        {
            company_name: "Exchange",
            address_line_one: "Hillview Ave, Palo Alto, California",
            contact_person_name: "Brian Diggs",
            contact_person_email: "brian@exchange.com",
            customer_status: true,
        },
        {
            company_name: "KPMG",
            address_line_one: "Mission College Blvd, United States",
            contact_person_name: "Smith Lane",
            contact_person_email: "smith@kpmg.com",
            customer_status: false, // ✅ Use false instead of "Disable"
        },
    ]);

    const [selectedCheckBox, setSelectedCheckBox] = useState([]);
    const [orderBy, setOrderBy] = React.useState("");
    const [order, setOrder] = React.useState("asc");

    useEffect(() => {
        console.log({rowsData})
    }, []);

    const handleChange1 = (event) => {
        setSelectedCheckBox([event.target.checked, event.target.checked]);
    };


    return (
        <>
            <div style={{display:"flex",flexDirection:"column",width:"100%",borderRadius:"10px"}}>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    <Paper
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            border: "none",
                            elevation: "0",
                        }}
                    >
                        <TableContainer sx={{ maxHeight: 440, border: "none" }}>
                            <Table stickyHeader aria-label="sticky table" style={{borderCollapse:"collapse"}}>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} sx={{
                                                minWidth: "10px",
                                                border: "none",
                                                alignItems: "right",
                                                backgroundColor:"black",
                                                color:"white"
                                            }}>
                                                {column.type === "checkbox" ? (
                                                    <Checkbox
                                                        style={{color:"white"}}
                                                        checked={selectedCheckBox[0] && selectedCheckBox[1]}
                                                        indeterminate={selectedCheckBox[0] !== selectedCheckBox[1]}
                                                        onChange={handleChange1}
                                                    />

                                                ) : (
                                                    <TableSortLabel
                                                        classes={{
                                                            root: "customSortLabel",
                                                        }}
                                                        active={orderBy === column.id}
                                                        direction={orderBy === column.id ? order : "asc"}
                                                        IconComponent={SortIcon}
                                                        style={{alignItems:"end"}}
                                                    >
                                                        {column.label}
                                                    </TableSortLabel>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rowsData.length > 0 ? (
                                            rowsData.map((row) => {
                                                const isItemSelected = selectedCheckBox.indexOf(row.name) !== -1;
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        {columns.map((column) => {
                                                            const value =
                                                                column.id === "company_name"
                                                                    ? `${row.company_name}`
                                                                    : row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        color:
                                                                            column.id === "company_name"
                                                                                ? "blue"
                                                                                : "inherit",
                                                                        fontSize: "12px",
                                                                        fontWeight: "500"
                                                                    }}
                                                                    // onClick={column.id === "company_name" ? () => handleEditCustomer(row) : undefined}
                                                                >
                                                                    {
                                                                        column.id === "contact_person_name" ? (
                                                                            <Box
                                                                                display="flex"
                                                                                 alignItems="center"
                                                                                 style={{
                                                                                     gap: "8px",
                                                                                 }}>
                                                                                <UserListUserIcon style={{ paddingLeft: "18px" }}/>
                                                                                {value}
                                                                            </Box>
                                                                        ) : column.id === "customer_status" ? (
                                                                            <Box display="flex"
                                                                                 alignItems="center"
                                                                                 style={{ gap: "8px" }}>
                                                                                <Switch
                                                                                    checked={row.customer_status}
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
                                                                                    {row.customer_status ? "Enable" : "Disable"}
                                                                              </span>
                                                                            </Box>
                                                                        ) : column.type === "checkbox" ? (
                                                                            <Checkbox
                                                                                checked={selectedCheckBox.includes(
                                                                                    row.customer_id
                                                                                )}
                                                                            />
                                                                        ):(
                                                                            value
                                                                        )}
                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                )
                                            })
                                        ): (
                                            <TableRow>
                                                <TableCell align="center" colSpan={columns.length}>
                                                        <h3 style={{ textAlign: "center" }}>
                                                            No Data Found
                                                        </h3>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </div>
        </>
    )
}
export default MuiTable;
