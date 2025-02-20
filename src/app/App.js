import '../App.css';
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import Layout from "./Layout";
import Login from "./component/Login/Login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import BlockLoader from "../shared/components/Loader/BlockLoader";

function App() {
    const { token, role } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simplified authentication check
    useEffect(() => {
        const authToken = localStorage.getItem('accessToken');

        if (authToken && token) {
            setIsLoggedIn(true);
            // Only navigate if we're not already on a valid path
            if (location.pathname === '/') {
                navigate('/dashboard');
            }
        } else {
            setIsLoggedIn(false);
            navigate('/login');
        }

        setIsLoading(false);
    }, [token, role, navigate, location.pathname]);

    if (isLoading) {
        return <BlockLoader isMain={true} />;
    }

    // Simplified rendering logic
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {isLoggedIn ? (
                <Suspense fallback={<BlockLoader isMain={true} />}>
                    <Layout />
                </Suspense>
            ) : (
                <Login />
            )}
        </>
    );
}

export default App;