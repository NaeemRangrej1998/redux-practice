import React from "react";
import {Card, Button, Modal, Box, Dialog, IconButton, Grid, CardContent, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import './DashboardImpl.css'
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BarChart from "../../../charts/BarChart";
import StackBar from "../../../charts/StackBar";

export const Analitics = () => {
    return (
        <>
            <div className="bgcolor">
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div style={{display: "flex",gap:"10px"}}>
                            <div style={{width: "50%"}}>
                                <Stack spacing={2} >
                                    <Card sx={{minWidth: 50 + "%",height: "19vh"}} className="gradient">
                                        <CardContent>
                                            <div>
                                                <CreditCardIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                                                $500.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div"
                                                        sx={{color: "#ccd1d1"}}>
                                                Total Earning
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{minWidth: 49 + "%",height: "19vh"}} className="gradientlight">
                                        <CardContent>
                                            <div>
                                                <ShoppingBagIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                                                $900.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div"
                                                        sx={{color: "#ccd1d1"}}>
                                                Total Orders
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </div>
                            <div style={{width: "50%"}}>
                                <Stack spacing={2} >
                                    <Card sx={{minWidth: 50 + "%" ,height: "19vh"}} className="gradient">
                                        <CardContent>
                                            <div>
                                                <CreditCardIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                                                $500.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div"
                                                        sx={{color: "#ccd1d1"}}>
                                                Total Earning
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{minWidth: 49 + "%", height: "19vh"}} className="gradientlight">
                                        <CardContent>
                                            <div>
                                                <ShoppingBagIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                                                $900.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div"
                                                        sx={{color: "#ccd1d1"}}>
                                                Total Orders
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <Card sx={{height: 40 + "vh"}}>
                            <CardContent><StackBar/></CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Box height={20}/>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card sx={{height: 40 + "vh"}}>
                            <CardContent><BarChart/></CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{height: 40 + "vh"}}>
                            <CardContent><BarChart/></CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
