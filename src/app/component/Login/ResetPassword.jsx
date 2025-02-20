import React, {useState} from 'react'
import './Login.css'
import {getUserEmail, resetPassword, userLogin} from "../../../service/AuthService";
import { useLocation } from "react-router-dom";

// import {useNavigate} from "react-router-dom";
import {setToken,setRole,clearAuth} from "../../../feature/counter/authSlice";
import {setTokenInLocalStorage} from "../../../service/TokenManage";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import showNotification from "../../../shared/helper/notification";
function ResetPassword() {
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    console.log({token});

    function handleSubmit(event) {
        event.preventDefault()
        try {
            const request={
                newPassword:password,
                resetToken:token
            }
            resetPassword(request).then((res)=>{
                if (res.status === 200) {
                    navigate('/login');
                    showNotification(res.message,'success');
                } else if (res.status === 404 || res.status === 401 || res.status === 400) {
                    showNotification(res.response.data.message, "error");
                } else showNotification(res.response.data.message, "error");
                // console.log({res})
            }).catch((error)=>{
                console.log(error)
            })
        }
        catch (error){
            console.log(error)
        }

    }

    return (
        <div id="login-form">
            <h1> Reset Password </h1>
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <div>
                    <input type="submit" value="submit"/>
                    {/*<Button>Back</Button>*/}
                </div>

            </form>
        </div>
    )
}

export default ResetPassword
