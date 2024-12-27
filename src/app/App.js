import '../App.css';
import { useSelector} from "react-redux";
import {Suspense, useEffect, useState} from "react";
import Layout from "./Layout";
import Login from "./component/Login/Login";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

function App() {
    const {token, role} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {

        const authToken = localStorage.getItem('accessToken')
        const pathname = location.pathname

        if (authToken && token ) {
            setIsLoggedIn(true);
            navigate('/dashboard')
        } else {
            setIsLoggedIn(false);
            navigate('/logout')
        }
        setIsLoading(false); // Set loading to false once check is done
    };

    useEffect(() => {
        checkAuth();
    }, [token, role]);

    return (
        <>
            {!token && <Navigate to={'/login'} /> }

            {
                isLoggedIn ? (<Suspense fallback={<div className="loading">Loading...</div>}>
                    <Layout/>
                </Suspense>) : (<Login/>)
            }
        </>


    )
}

export default App;
