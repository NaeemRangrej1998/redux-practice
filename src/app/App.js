import '../App.css';
import { useSelector} from "react-redux";
import {Suspense, useEffect, useState} from "react";
import Layout from "./Layout";
import Login from "./component/Login/Login";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import BlockLoader from "../shared/components/Loader/BlockLoader";

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
        if (authToken && token ) {
            setIsLoggedIn(true);
            navigate(location.pathname);
        } else {
            setIsLoggedIn(false);
            navigate('/logout')
        }
        setIsLoading(false); // Set loading to false once check is done
    };

    useEffect(() => {
        checkAuth();
    }, [token, role]);
    if (isLoading) {
        return <BlockLoader isMain={true} />; // Show loader while checking auth
    }
    return (
        <>
            {!token && <Navigate to={'/login'} /> }
            {isLoggedIn ? (
                <Suspense fallback={<BlockLoader isMain={true} />}>
                    <Layout />
                </Suspense>
            ) : (
                <Login />
            )}
        </>


    )
}

export default App;
