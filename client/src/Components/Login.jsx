import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const nameInput = useRef();
    const navigate = useNavigate();

    const submitUser = (e) => {
        e.preventDefault();
        setUser(nameInput.current.value);
        navigate('/chat');
    }
    return(
        <form onSubmit={submitUser}>
            <input id='user-input' ref={nameInput} placeholder='Enter your name'/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Login;
