import React from "react";
import '../App.css';
import {useSelector} from "react-redux";
import {Suspense, useEffect, useState} from "react";
import Layout from "./Layout";
import Login from "./component/Login/Login";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import BlockLoader from "../shared/components/Loader/BlockLoader";
import redirectionEnum from "../enums/redirection.enum";

function App() {
    const {token, role} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simplified authentication check
    // useEffect(() => {
    //     const authToken = localStorage.getItem('accessToken');
    //     const pathname = location.pathname
    //
    //     if (authToken && token && role) {
    //         setIsLoggedIn(true);
    //         // Only navigate if we're not already on a valid path
    //         if (location.pathname === '/') {
    //             pathname === '/' && navigate(redirectionEnum[role])
    //         }
    //     } else {
    //         setIsLoggedIn(false);
    //         navigate('/login');
    //     }
    //
    //     setIsLoading(false);
    // }, [token, role, navigate, location.pathname]);


    // Simplified rendering logic
    // if (!token) {
    //     return <Navigate to="/login" />;
    // }
    // useEffect(() => {
    //     checkAuth()
    // }, [])
    // const checkAuth = () => {
    //
    //     const authToken = localStorage.getItem('accessToken')
    //     const pathname = location.pathname
    //
    //     if (authToken && token && role) {
    //         setIsLoggedIn(true);
    //         pathname === '/' && navigate(redirectionEnum[role])
    //     } else {
    //         setIsLoggedIn(false);
    //         navigate('/logout')
    //     }
    //     setIsLoading(false); // Set loading to false once check is done
    // };
    // useEffect(() => {
    //     checkAuth();
    // }, [token, role]);
    useEffect(() => {
        const authToken = localStorage.getItem('access_token'); // Match the key used in Login.js
        const pathname = location.pathname;

        if (authToken && token && role) {
            setIsLoggedIn(true);
            if (pathname === '/') {
                navigate(redirectionEnum[role])
            }
        } else {
            setIsLoggedIn(false);
            navigate('/login');
        }
        setIsLoading(false);
    }, [token, role, navigate, location.pathname]);

    if (isLoading) {
        return <BlockLoader isMain={true}/>;
    }
    return (
        <>
            {isLoggedIn ? (
                <Suspense fallback={<BlockLoader isMain={true}/>}>
                    <Layout/>
                </Suspense>
            ) : (
                <Login/>
            )}
        </>
    );
}

export default App;