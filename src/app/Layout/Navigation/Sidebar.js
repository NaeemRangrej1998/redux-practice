import React, { useEffect, useState, useMemo } from "react";
import "./sidebar.scss";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import UserList from "../../component/UserManagement/UserList";

function Sidebar() {
    const [expanded, setExpanded] = useState([]);
    const location = useLocation();

    // Memoize the menu items to avoid unnecessary re-creation
    const menuItem = useMemo(() => [
        { id: 1, title: "Dashboard", to: "/dashboard", children: [] },
        { id: 2, title: "User Management", to: "/userlist", children: [] },
        { id: 3, title: "Role Management", to: "/rolelist", children: [] },
        { id: 4, title: "Dialog Management", to: "/DailogPractice", children: [] },
        { id: 5, title: "Task Management", to: "/taskManage", children: [] },


    ], []);

    // UseEffect with a stable dependency array
    useEffect(() => {
        const path = location.pathname;

        const currentPage = menuItem.find(item => {
            if (item.children?.length > 0) {
                return item.children.find(child => child.to === path);
            }
            return path.includes(item.to);
        });

        if (currentPage) {
            setExpanded([currentPage.id]);
        }
    }, [location.pathname, menuItem]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded((prev) => {
            return isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel);
        });
    };

    return (
        <div className="sidebar">
            <div className="logo">
                {/* Add your logo here */}
            </div>
            <div className="sidebar-text">
                <div className="sidebar-field">
                    <List>
                        {menuItem.map((item) => (
                            <MenuItem
                                key={item.id}
                                item={item}
                                expanded={expanded}
                                handleChange={handleChange}
                                currentPath={location.pathname}
                            />
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

const MenuItem = ({ item, expanded, handleChange, currentPath }) => {
    console.log({ item, expanded, handleChange, currentPath })
    const Component = SingleLevel;
    return (
        <Component
            item={item}
            expanded={expanded}
            handleChange={handleChange}
            currentPath={currentPath}
        />
    );
};

const SingleLevel = ({ item, currentPath }) => {
    const isActive = currentPath === item.to ||
        (currentPath.includes("dashboard") && item.to.includes("dashboard"));
    console.log({isActive,item});
    return (
        <div className="nav-link-main">
            <Link to={item.to} className={`nav-link ${isActive ? "active" : ""}`}>
                <ListItem button>
                    {/*{item.icon && <span className="menu-icon">{item.icon}</span>}*/}
                    <ListItemText primary={item.title} />
                </ListItem>
            </Link>
        </div>
    );
};

export default Sidebar;
