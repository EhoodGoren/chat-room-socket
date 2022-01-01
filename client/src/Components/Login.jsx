import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login({ setUser }) {
    const nameInput = useRef();
    const navigate = useNavigate();

    const submitUser = (e) => {
        e.preventDefault();
        setUser(nameInput.current.value);
        navigate('/chat');
    }
    return(
        <form id='login' onSubmit={submitUser}>
                <input id='user-input' ref={nameInput} placeholder='Enter your name'/>
                <button id='user-submit' type='submit'>Submit</button>
        </form>
    )
}

export default Login;
