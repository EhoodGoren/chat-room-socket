import React, { useRef } from "react";

function SendMessage({ user, socketRef }) {
    const messageInput = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        const messageTime = getTimeHHMM();
        socketRef.current.emit('message', { name: user, message: {time: messageTime, text: messageInput.current.value} });
        messageInput.current.value = '';
    }
    
    return(
        <form id='send-message' className='chat-section' onSubmit={sendMessage}>
            <input ref={messageInput} placeholder='Enter messages' />
            <button type='submit' onClick={sendMessage}>Send</button>
        </form>
    )
}

export default SendMessage;

function getTimeHHMM() {
    const date = new Date();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${hours}:${minutes}`;
}
