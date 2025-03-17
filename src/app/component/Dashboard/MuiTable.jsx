import React, {useEffect, useState} from "react";
import {Grid, Paper, TableContainer} from "@mui/material";

const columns = [
    { id: "select", label: "", type: "checkbox" },
    { id: "company_name", label: "Company Name" },
    { id: "address_line_one", label: "Address" },
    { id: "contact_person_name", label: "Contact Person Name" },
    { id: "contact_person_email", label: "Contact Person Email" },
    { id: "customer_status", label: "Control" },
];

const MuiTable = () => {
        const companies= [
        {
            "companyName": "KT",
            "address": "90 Bullgong-ro (206 Jungji-dong), Bundang-gu, Seongnam-city, GyeongGi-Do, 13606 Korea",
            "contactPersonName": "Max Craig",
            "contactPersonEmail": "max@kt.com",
            "control": "Enable"
        },
        {
            "companyName": "Alt Box",
            "address": "Deshmoret e Kombit Blvd, Twin Towers Buildings, Building 1 13th Floor",
            "contactPersonName": "Melody Morrison",
            "contactPersonEmail": "melody@altbox.com",
            "control": "Enable"
        },
        {
            "companyName": "Dellito",
            "address": "South America Ltda. 230, George Ohm Street,, Sao Paulo - SP 04576-020. Brazil",
            "contactPersonName": "Drew Cano",
            "contactPersonEmail": "sean@delilto.com",
            "control": "Enable"
        },
        {
            "companyName": "Exchange",
            "address": "Americas Sales Office (Palo Alto). 3421 Hillview Ave. Palo Alto, California 94304",
            "contactPersonName": "Brian Diggs",
            "contactPersonEmail": "brian@exchange.com",
            "control": "Enable"
        },
        {
            "companyName": "KPMG",
            "address": "Santa Clara, 2200 Mission College Blvd, United States",
            "contactPersonName": "Smith Lane",
            "contactPersonEmail": "smith@kpmg.com",
            "control": "Enable"
        }
    ]

    const [rowsData, setRowsData] = useState([
        {
            "companyName": "KT",
            "address": "90 Bullgong-ro (206 Jungji-dong), Bundang-gu, Seongnam-city, GyeongGi-Do, 13606 Korea",
            "contactPersonName": "Max Craig",
            "contactPersonEmail": "max@kt.com",
            "control": "Enable"
        },
        {
            "companyName": "Alt Box",
            "address": "Deshmoret e Kombit Blvd, Twin Towers Buildings, Building 1 13th Floor",
            "contactPersonName": "Melody Morrison",
            "contactPersonEmail": "melody@altbox.com",
            "control": "Enable"
        },
        {
            "companyName": "Dellito",
            "address": "South America Ltda. 230, George Ohm Street,, Sao Paulo - SP 04576-020. Brazil",
            "contactPersonName": "Drew Cano",
            "contactPersonEmail": "sean@delilto.com",
            "control": "Enable"
        },
        {
            "companyName": "Exchange",
            "address": "Americas Sales Office (Palo Alto). 3421 Hillview Ave. Palo Alto, California 94304",
            "contactPersonName": "Brian Diggs",
            "contactPersonEmail": "brian@exchange.com",
            "control": "Enable"
        },
        {
            "companyName": "KPMG",
            "address": "Santa Clara, 2200 Mission College Blvd, United States",
            "contactPersonName": "Smith Lane",
            "contactPersonEmail": "smith@kpmg.com",
            "control": "Enable"
        }
    ]);
    useEffect(() => {
        console.log({rowsData})
    }, []);
    return (
        <>
            <div>
                <Grid item xs={12} style={{ marginTop: "20px" ,backgroundColor:"red"}}>
                    <Paper
                        sx={{
                            width: "100%",
                            elevation: "0",
                        }}
                    >
                        <TableContainer>

                        </TableContainer>
                    </Paper>
                </Grid>
            </div>
        </>
    )
}
export default MuiTable;
