import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeCookie } from '../../../shared/helpers/utils';
import { useDispatch } from 'react-redux';
import {clearAuth} from "../../../feature/counter/authSlice";

const Logout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        handleSignOut();
    }, []);

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.error(error);
        }
        // localStorage.setItem('auth', 'false');
        localStorage.removeItem('accessToken')
        dispatch(clearAuth())
        removeCookie();
        navigate('/login')
    };
    return <></>;
};

export default Logout;
