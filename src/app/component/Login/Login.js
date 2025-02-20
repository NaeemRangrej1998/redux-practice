import React, {useEffect, useState} from 'react'
import './Login.css'
import {userLogin} from "../../../service/AuthService";
import {setToken,setRole,clearAuth} from "../../../feature/counter/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import showNotification from "../../../shared/helper/notification";
import {jwtDecode} from 'jwt-decode';
import redirectionEnum from "../../../enums/redirection.enum";

function Login() {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {token, role} = useSelector(state => state.auth)

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (authToken && token && role) {
            navigate(redirectionEnum[role])
        }
    }, [])


    // In Login.js - Fix token storage consistency
    function handleSubmit(event) {
        event.preventDefault()
        try {
            const request={
                email:userName,
                password:password
            }
            userLogin(request).then((res)=>{
                if (res.status && res.status===200)
                {
                    const token = res.data.token;
                    // Use consistent key name
                    localStorage.setItem('access_token', token) // Match the key used in Sidebar.js SingleLevel component
                    dispatch(setToken(res.data.token));
                    const decodedToken = jwtDecode(token);
                    const roles = decodedToken.APPLICATION_ROLE || '';
                    dispatch(setRole(roles))
                    localStorage.setItem('role', roles);
                    // Determine redirect path based on role
                    // console.log({redirectionEnum})
                    const redirectPath = redirectionEnum[roles];
                    // console.log("Login successful. Redirecting to:", redirectPath);

                    // Navigate to the appropriate route
                    navigate(redirectPath, { replace: true });
                }
                else {
                    throw res
                }
            }).catch((error)=>{
                let message = error.response?.data?.error || "Login failed"
                showNotification(message,'error');
            })
        }
        catch (error){
            let message = error.response?.data?.error || "An error occurred"
            showNotification(message,'error');
        }
    }
    return (
        <div id="login-form">
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" id="username" name="username" onChange={(e) => setUserName(e.target.value)}/>
                <label>Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="submit"/>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
