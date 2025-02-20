import React, {useState} from 'react'
import './Login.css'
import {userLogin} from "../../../service/AuthService";
// import {useNavigate} from "react-router-dom";
import {setToken,setRole,clearAuth} from "../../../feature/counter/authSlice";
import {setTokenInLocalStorage} from "../../../service/TokenManage";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import showNotification from "../../../shared/helper/notification";
import {jwtDecode} from 'jwt-decode';
import redirectionEnum from "../../../enums/redirection.enum";

function Login() {
    console.log("Naim")
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch()
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
                    localStorage.setItem('accessToken',token)
                    // setTokenInLocalStorage(res.data.token)
                    dispatch(setToken(res.data.token));
                    const decodedToken = jwtDecode(token);
                    console.log({decodedToken})
                    const roles = decodedToken.APPLICATION_ROLE || '';
                    dispatch(setRole(roles))
                    console.log({roles})
                    setTimeout(() => {
                        navigate(redirectionEnum[roles]);
                    }, 150)
                }
                else {
                    throw res
                }
                // console.log({res})
            }).catch((error)=>{
                let message =error.response.data.error
                showNotification(message,'error');
            })
        }
        catch (error){
            let message =error.response.data.error
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
