import React from "react";
import {Card, Button, Modal, Box, Dialog, IconButton, Grid, CardContent, Typography} from "@mui/material";
import RoleList from "../RoleManagement/RoleList";
import {Stack} from "@mui/system";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './DashboardImpl.css'

export const CardImpl = () => {
    return (
        <>
            {/*<Card style={{ position: "relative" }} className="min-h-96 ">*/}
            {/*    Naim*/}
            {/*</Card>*/}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack spacing={2} direction="row">
                        <Card sx={{minWidth: 49 + "%", height: 168}}>
                            <CardContent>
                                <div>
                                    <CreditCardIcon/>
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                    $500.00
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                    Total Earning
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{minWidth: 49 + "%", height: 168}}>
                            <CardContent>
                                <div>
                                    <ShoppingBagIcon/>
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                    $900.00
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                   Total Orders
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2}>
                        <Card>
                                {/* ✅ Fixed: Added alignItems="center" */}
                                <Stack spacing={2} direction="row" alignItems="center">
                                    {/* ✅ Ensuring flex layout */}
                                    <div className="tarbuch" style={{display: "flex", alignItems: "center",marginLeft:"20px"}}>
                                        <StorefrontIcon fontSize="large"/>
                                    </div>
                                    <div className="paddingall" style={{display: "flex", flexDirection: "column"}}>
                                        <span className="priceTitle"
                                              style={{fontSize: "1.5rem", fontWeight: "bold"}}>$203k</span>
                                        <span className="priceSubTitle" style={{color: "gray"}}>Total Income</span>
                                    </div>
                                </Stack>
                        </Card>
                        <Card>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    {/* ✅ Ensuring flex layout */}
                                    <div className="tarbuch" style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                        <StorefrontIcon fontSize="large"/>
                                    </div>
                                    <div className="paddingall" style={{display: "flex", flexDirection: "column"}}>
                                        <span className="priceTitle"
                                              style={{fontSize: "1.5rem", fontWeight: "bold"}}>$203k</span>
                                        <span className="priceSubTitle" style={{color: "gray"}}>Total Income</span>
                                    </div>
                                </Stack>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
            <Box height={20}/>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card sx={{height: 60 + "vh"}}>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{height: 60 + "vh"}}>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
export default CardImpl;