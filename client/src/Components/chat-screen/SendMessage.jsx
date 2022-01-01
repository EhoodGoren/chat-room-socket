import React, { useRef } from "react";
import './SendMessage.css';

function SendMessage({ user, socketRef, privateMessage, setPrivateMessage }) {
    const messageInput = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        const emitEvent = privateMessage ? 'privateMessage' : 'message';
        const messageTime = getTimeHHMM();
        socketRef.current.emit(emitEvent, {
            name: user,
            message: {
                time: messageTime,
                text: messageInput.current.value,
                privateMessage: privateMessage ? true : false
            },
            target: privateMessage
        });
        messageInput.current.value = '';
    }
    const messageInputClass = privateMessage ? 'shorter-message-input' : 'message-input';
    
    return(
        <form id='send-message' className='chat-section' onSubmit={sendMessage}>
            {privateMessage &&
            <span className='private-message'>To: {privateMessage}{'  '}
                <input type='button' className='remove-private' onClick={() => setPrivateMessage('')} value='❌'/>
            </span>}
            <input className={messageInputClass} ref={messageInput} placeholder='Write a message' />
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
