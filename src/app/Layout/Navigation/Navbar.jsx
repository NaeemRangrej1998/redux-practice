import React, {useEffect, useState} from "react";
import "./navbar.scss";
// import {useNavigate} from "react-router-dom";
import {Menu, MenuItem} from "@mui/base";

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    // const navigate = useNavigate();
    // const [fullName, setFullName] = useState("");

    // useEffect(() => {
    //     const fullName = localStorage.getItem("fullName");
    //     setFullName(fullName);
    // }, [fullName]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";  // This will navigate to the login page
    };


    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbar">
            <div
                className="icons"
                // onClick={handleMenuClick}
                style={{cursor: "pointer"}}
            >
                <span className="initials">{"naim"}</span>
                {/*<UsersIcon/>*/}
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        fontSize: "0.875rem",
                        padding: "6px 16px",
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default NavBar;