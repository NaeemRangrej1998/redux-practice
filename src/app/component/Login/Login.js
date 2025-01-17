import React, {useState} from 'react'
import './Login.css'
import {userLogin} from "../../../service/AuthService";
// import {useNavigate} from "react-router-dom";
import {setToken,setRole,clearAuth} from "../../../feature/counter/authSlice";
import {setTokenInLocalStorage} from "../../../service/TokenManage";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
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
                if (res.status && res.status==200)
                {
                    localStorage.setItem('accessToken', res.data.token)
                    setTokenInLocalStorage(res.data.token)
                    dispatch(setToken(res.data.token));
                    navigate('/dashboard')
                }
                else {
                    throw res
                }
                console.log({res})
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
