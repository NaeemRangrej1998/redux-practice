import React from "react";
import "./navbar.scss";

function NavBar() {
    return (
        <div className="navbar">
            <div
                className="icons"
                style={{cursor: "pointer"}}
            >
                <span className="initials">{"Naim"}</span>
            </div>

        </div>
    );
}

export default NavBar;