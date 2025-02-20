
// function Sidebar() {
//     const [expanded, setExpanded] = useState([]);
//     const location = useLocation();
//
//     // Memoize the menu items to avoid unnecessary re-creation
//     const menuItem = useMemo(() => [
//         { id: 1, title: "Dashboard", to: "/dashboard", children: [] },
//         { id: 2, title: "User Management", to: "/userlist", children: [] },
//         { id: 3, title: "Role Management", to: "/rolelist", children: [] },
//         { id: 4, title: "Dialog Management", to: "/DailogPractice", children: [] },
//         { id: 5, title: "Task Management", to: "/taskManage", children: [] },
//     ], []);
//
//     // UseEffect with a stable dependency array
//     useEffect(() => {
//         const path = location.pathname;
//
//         const currentPage = menuItem.find(item => {
//             if (item.children?.length > 0) {
//                 return item.children.find(child => child.to === path);
//             }
//             return path.includes(item.to);
//         });
//
//         if (currentPage) {
//             setExpanded([currentPage.id]);
//         }
//     }, [location.pathname, menuItem]);
//
//     const handleChange = (panel) => (event, isExpanded) => {
//         setExpanded((prev) => {
//             return isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel);
//         });
//     };
//
//     return (
//         <div className="sidebar">
//             <div className="logo">
//                 {/* Add your logo here */}
//             </div>
//             <div className="sidebar-text">
//                 <div className="sidebar-field">
//                     <List>
//                         {menuItem.map((item) => (
//                             <MenuItem
//                                 key={item.id}
//                                 item={item}
//                                 expanded={expanded}
//                                 handleChange={handleChange}
//                                 currentPath={location.pathname}
//                             />
//                         ))}
//                     </List>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// const MenuItem = ({ item, expanded, handleChange, currentPath }) => {
//     console.log({ item, expanded, handleChange, currentPath })
//     const Component = SingleLevel;
//     return (
//         <Component
//             item={item}
//             expanded={expanded}
//             handleChange={handleChange}
//             currentPath={currentPath}
//         />
//     );
// };
//
// const SingleLevel = ({ item, currentPath }) => {
//     const isActive = currentPath === item.to ||
//         (currentPath.includes("dashboard") && item.to.includes("dashboard"));
//     console.log({isActive,item});
//     return (
//         <div className="nav-link-main">
//             <Link to={item.to} className={`nav-link ${isActive ? "active" : ""}`}>
//                 <ListItem button>
//                     {/*{item.icon && <span className="menu-icon">{item.icon}</span>}*/}
//                     <ListItemText primary={item.title} />
//                 </ListItem>
//             </Link>
//         </div>
//     );
// };
//
// export default Sidebar;
// import React, {useEffect, useState} from "react";
import React, {useEffect, useState} from "react";
import "./sidebar.scss";
import {
    Accordion,
    AccordionSummary,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import CpuIcon from "../../../assets/icons/CpuIcon";
import BuildingIcon from "../../../assets/icons/BuildingIcon";
import UserCircleIcon from "../../../assets/icons/UserCircleIcon";
import UserGroupIcon from "../../../assets/icons/UserGroupIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import TruckIcon from "../../../assets/icons/TruckIcon";
import CircuitIcon from "../../../assets/icons/CircuitIcon";
import GitForkIcon from "../../../assets/icons/GitForkIcon";
import WrenchIcon from "../../../assets/icons/WrenchIcon";
import GearIcon from "../../../assets/icons/GearIcon";
import GearFine from "../../../assets/icons/GearFine";
import {useSelector} from "react-redux";
import roleEnum from "../../../enums/role.enum";
import {Link, useLocation, useNavigate} from "react-router-dom";

function Sidebar() {
    const [expanded, setExpanded] = useState([]);
    const navigate = useNavigate();
    const location=useLocation();
    const [hasNavigated, setHasNavigated] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded((prev) => {
            if (isExpanded) {
                return [...prev, panel];
            } else {
                return prev.filter((p) => p !== panel);
            }
        });
    };


    const menuItem = [
        {
            id: 1,
            title: "Dashboard",
            to: "/dashboard", // Home page or main dashboard
            icon: <DashboardIcon/>,
            children: [],
        },
        {
            id: 2,
            title: "XT Admin",
            to: "/xt-admin", // Admin dashboard for XT-related activities
            icon: <CpuIcon/>,
            children: [
                {
                    id: 3,
                    title: "TCU Whitelisting",
                    icon: <CpuIcon/>,
                    to: "/xt-admin/tcu-whitelisting", // Specific TCU whitelisting page
                    children: [],
                },
                {
                    id: 4,
                    title: "Company Registration",
                    icon: <BuildingIcon/>,
                    to: "/xt-admin/customer-registration", // Customer registration management
                    children: [],
                },
            ],
        },
        {
            id: 5,
            title: "User Management",
            icon: <UserCircleIcon/>,
            to: "/user-management", // Main User Management page
            children: [
                {
                    id: 6,
                    title: "User List",
                    icon: <UserIcon/>,
                    to: "/user-management/user-list", // Display user list
                    children: [],
                },
                {
                    id: 7,
                    title: "User Group",
                    icon: <UserGroupIcon/>,
                    to: "/user-management/user-group", // Manage user groups
                    children: [],
                },
                {
                    id: 8,
                    title: "TCU Association",
                    icon: <UsersIcon/>,
                    to: "/user-management/tcu-association", // Manage TCU associations
                    children: [],
                },
            ],
        },
        {
            id: 9,
            title: "TCU Management",
            to: "/tcu-management", // Main TCU Management page
            icon: <TruckIcon/>,
            children: [
                {
                    id: 10,
                    title: "TCU List",
                    icon: <CircuitIcon/>,
                    to: "/tcu-management/tcu-list", // Display TCU list
                    children: [],
                },
                {
                    id: 11,
                    title: "TCU Group",
                    icon: <GitForkIcon/>,
                    to: "/tcu-management/tcu-group", // Manage TCU groups
                    children: [],
                },
            ],
        },
        {
            id: 12,
            title: "TCU FW Management",
            icon: <WrenchIcon/>,
            to: "/tcu-fw-management", // Main TCU firmware management page
            children: [
                {
                    id: 13,
                    title: "TCU FW List",
                    icon: <GearIcon/>,
                    to: "/tcu-fw-management/tcu-fw-list", // Display TCU firmware list
                    children: [],
                },
                {
                    id: 14,
                    icon: <GearFine/>,
                    title: "TCU FW Upgrade",
                    to: "/tcu-fw-management/tcu-fw-upgrade", // Manage firmware upgrades
                    children: [],
                },
                {
                    id: 15,
                    title: "TCU Upgrade History",
                    icon: <WrenchIcon/>,
                    to: "/tcu-fw-management/tcu-upgrade-history", // View firmware upgrade history
                    children: [],
                },
            ],
        },
        {
            id: 16,
            title: "User List Management",
            to: "/userlist", // Home page or main dashboard
            icon: <DashboardIcon/>,
            children: [],
        },
        {
            id: 17,
            title: "Role Management",
            to: "/rolelist", // Home page or main dashboard
            icon: <DashboardIcon/>,
            children: [],
        },
    ];

    const sidebarPermissions = [
        {
            id: 1,
            mainTab: "Dashboard",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                standardUser: true,
                xtFactoryUser: false,
                xtStandardUser:true,
                xtAdvanceUser:true,
                ADMIN:true,
                USER:true
            },
        },
        {
            id: 2,
            mainTab: "XT Admin",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: false,
                advanceUser: false,
                standardUser: false,
                xtFactoryUser: false,
                xtStandardUser: false,
                xtAdvanceUser: false,
            },
        },
        {
            id: 3,
            mainTab: "TCU Whitelisting",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: false,
                advanceUser: false,
                standardUser: false,
                xtFactoryUser: true,
                xtStandardUser: false,
                xtAdvanceUser: false,
            },
        },
        {
            id: 4,
            mainTab: "Company Registration",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: false,
                advanceUser: false,
                standardUser: false,
                xtAdvanceUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 5,
            mainTab: "User Management",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: false,
                xtAdvanceUser: false,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 6,
            mainTab: "User List",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: false,
                xtAdvanceUser: false,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 7,
            mainTab: "User Group",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: false,
                xtAdvanceUser: false,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 8,
            mainTab: "TCU Association",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: false,
                xtAdvanceUser: false,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 9,
            mainTab: "TCU Management",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: true,
                xtStandardUser: true,
                xtFactoryUser: false,
            },
        },
        {
            id: 10,
            mainTab: "TCU List",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: true,
                xtStandardUser: true,
                xtFactoryUser: false,
            },
        },
        {
            id: 11,
            mainTab: "TCU Group",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: true,
                xtStandardUser: true,
                xtFactoryUser: false,
            },
        },
        {
            id: 12,
            mainTab: "TCU FW Management",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 13,
            mainTab: "TCU FW List",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 14,
            mainTab: "TCU FW Upgrade",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 15,
            mainTab: "TCU Upgrade History",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: true,
                advanceUser: true,
                xtAdvanceUser: true,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 16,
            mainTab: "TCU FW ADD",
            subTab: "",
            permissions: {
                xtAdmin: true,
                customerAdmin: false,
                advanceUser: false,
                xtAdvanceUser: false,
                standardUser: false,
                xtStandardUser: false,
                xtFactoryUser: false,
            },
        },
        {
            id: 17,
            mainTab: "User List Management",
            subTab: "",
            permissions: {
               ADMIN:true,
               USER:true
            },
        },
        {
            id: 18,
            mainTab: "Role Management",
            subTab: "",
            permissions: {
                ADMIN:true,
                USER:true
            },
        },
    ];

    const userRole = useSelector((state) => state.auth.role);

    const filterMenuItems = (items) => {
        return items
            .map((item) => {
                const permission = sidebarPermissions.find((perm) => {
                    return perm.mainTab === item.title;
                });
                console.log({permission})
                let hasPermission = false;
                if (permission) {
                    switch (userRole) {
                        case roleEnum.XT_ADMIN:
                            hasPermission = permission.permissions.xtAdmin;
                            console.log({hasPermission})
                            break;
                        case roleEnum.CUSTOMER_ADMIN:
                            hasPermission = permission.permissions.customerAdmin;
                            break;
                        case roleEnum.ADVANCE_USER:
                            hasPermission = permission.permissions.advanceUser;
                            break;
                        case roleEnum.STANDARD_USER:
                            hasPermission = permission.permissions.standardUser;
                            break;
                        case roleEnum.XT_FACTORY_USER:
                            hasPermission = permission.permissions.xtFactoryUser;
                            break;
                        case roleEnum.XT_STANDARD_USER:
                            hasPermission = permission.permissions.xtStandardUser;
                            break;
                        case roleEnum.XT_ADVANCE_USER:
                            hasPermission = permission.permissions.xtAdvanceUser;
                            break;
                        case roleEnum.ADMIN:
                            hasPermission = permission.permissions.ADMIN;
                            break;
                        case roleEnum.USER:
                            hasPermission = permission.permissions.USER;
                            break;
                        default:
                            hasPermission = false;
                    }
                }

                let filteredChildren = [];
                if (item.children && item.children.length > 0) {
                    filteredChildren = filterMenuItems(item.children);
                }

                if (hasPermission || filteredChildren.length > 0) {
                    return {...item, children: filteredChildren};
                }

                return null;
            })
            .filter((item) => item !== null);
    };
    const filteredMenuItems = filterMenuItems(menuItem);

    // In Sidebar.js - Fix useEffect for initial expansion
    useEffect(() => {
        const path = location.pathname;

        // Initialize empty array for expanded items
        let expandedItems = [];

        // Find which top-level menu item should be expanded based on current path
        for (const item of menuItem) {
            // Check if current path matches this item or any of its children
            const isCurrentPath = item.to === path;
            const hasMatchingChild = item.children?.some(child => child.to === path);

            if (isCurrentPath || hasMatchingChild) {
                expandedItems.push(item.id);
                break;
            }
        }

        // Special handling for dashboard
        if (path.includes('dashboard')) {
            const dashboardItem = menuItem.find(item => item.to.includes('dashboard'));
            if (dashboardItem) {
                expandedItems.push(dashboardItem.id);
            }
        }
        console.log({expandedItems})
        // Update expanded state
        setExpanded(expandedItems);
    }, [location.pathname]);

    return (
        <div className="sidebar">
            <div className="logo">
                {/*<img className="logo-src" src={Logo} alt=""/>*/}
            </div>
            <div className="sidebar-text">
                <div className="sidebar-field">
                    <List>
                        {filteredMenuItems.map((item, key) => (
                            <>
                                <MenuItem
                                    key={key}
                                    item={item}
                                    expanded={expanded}
                                    handleChange={handleChange}
                                />
                            </>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}

const MenuItem = ({item, expanded, handleChange, selected}) => {
    const Component =
        item.children && item.children.length > 0 ? MultiLevel : SingleLevel;
    return (
        <Component
            item={item}
            expanded={expanded}
            handleChange={handleChange}
            selected={selected}
        />
    );
};

// const SingleLevel = ({item}) => {
//     const navigate = useNavigate();
//
//     const handleLogout = () => {
//         localStorage.removeItem("access_token");
//         // toast.success(userLoggedOutSuccess);
//         navigate("/", {replace: true});
//     };
//
//     const checkRightsAndLogout = async (to) => {
//         if (to === "logout") {
//             handleLogout();
//         } else {
//         }
//     };
//     // eslint-disable-next-line no-restricted-globals
//     const isActive = location.pathname === item.to || (location.pathname.includes('dashboard') && item.to.includes('dashboard'));
//
//     return (
//         <div className="nav-link-main">
//             <Link
//                 to={item.to}
//                 className={`nav-link ${isActive ? "active" : ""}`}
//                 onClick={() => checkRightsAndLogout(item.to)}
//                 activeClassName="active"
//             >
//                 <ListItem button>
//                     {item.icon && <span className="menu-icon">{item.icon}</span>}
//                     <ListItemText primary={item.title}/>
//                 </ListItem>
//             </Link>
//         </div>
//     );
// };
// Fix SingleLevel component in Sidebar.js
const SingleLevel = ({item}) => {
    const navigate = useNavigate();
    const location = useLocation(); // Add this line to get location

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/", {replace: true});
    };

    const checkRightsAndLogout = async (to) => {
        if (to === "logout") {
            handleLogout();
        }
    };

    // Fix isActive check to properly compare paths
    const isActive = location.pathname === item.to ||
        (location.pathname.includes('dashboard') && item.to.includes('dashboard'));

    return (
        <div className="nav-link-main">
            <Link
                to={item.to}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => checkRightsAndLogout(item.to)}
            >
                <ListItem button>
                    {item.icon && <span className="menu-icon">{item.icon}</span>}
                    <ListItemText primary={item.title}/>
                </ListItem>
            </Link>
        </div>
    );
};
const MultiLevel = ({item, expanded, handleChange}) => {
    const {children} = item;

    return (
        <Accordion
            className="accordion"
            expanded={expanded.includes(item.id)}
            onChange={handleChange(item.id)}
        >
            <AccordionSummary
                className="accordionSummary"
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`panel${item.id}bh-content`}
                id={`panel${item.id}bh-header`}
            >
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                <ListItemText primary={item.title} className="listItem"/>
            </AccordionSummary>
            <AccordionDetails>
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <MenuItem
                            key={key}
                            item={child}
                            expanded={expanded}
                            handleChange={handleChange}
                        />
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default Sidebar;
