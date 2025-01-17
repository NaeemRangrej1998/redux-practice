import React, {useState} from 'react'
import './Login.css'
import {getUserEmail, userLogin} from "../../../service/AuthService";
// import {useNavigate} from "react-router-dom";
import {setToken,setRole,clearAuth} from "../../../feature/counter/authSlice";
import {setTokenInLocalStorage} from "../../../service/TokenManage";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import showNotification from "../../../shared/helper/notification";
function ForgotPassword() {
    console.log("Naim")
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch()
    function handleSubmit(event) {
        event.preventDefault()
        try {
            const request={
                email:userName
            }
            getUserEmail(request).then((res)=>{
                console.log({res});
                if (res.status === 200) {
                    navigate('/login');
                    showNotification(res.message,'success');
                } else if (res.status === 404 || res.status === 401 || res.status === 400) {
                    showNotification(res.message, "error");
                } else showNotification(res.message, "error");
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
            <h1> Forgot Password </h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" id="Email" name="Email" onChange={(e) => setUserName(e.target.value)}/>
                <div>
                    <input type="submit" value="submit"/>
                    <Button>Back</Button>
                </div>

            </form>
        </div>
    )
}

export default ForgotPassword
