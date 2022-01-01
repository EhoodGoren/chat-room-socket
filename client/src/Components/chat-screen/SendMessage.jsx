import React, { useRef } from "react";
import './SendMessage.css';

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
            <input className='message-input' ref={messageInput} placeholder='Write a message' />
            <input
                className='send-button'
                type='image'
                src='https://image.flaticon.com/icons/png/512/60/60525.png'
                alt='Send message'
                onClick={sendMessage}
            />
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
