import React from "react";
import './Messages.css';

function Messages({ user, messages }) {
    const generateMessage = (name, message, index) => {
        const { time, text } = message;
        if(!name) {
            return (
                <div
                    key={`announcement ${index}`}
                    className='announcements'
                >{message}</div>
            )
        }
        const messageClass = name === user ? 'self-messages' : 'others-messages';
            return (
                <div
                    key={`message ${index}`}
                    className={`messages ${messageClass}`}
                >
                    <span className='message-time'>{time}</span>
                    {'           '}
                    <span className='message-text'>{name}: {text}</span>
                </div>
            )
    }

    return(
        <div id='chat-messages' className='chat-section'>
            {messages.map(({ name, message }, index) => generateMessage(name, message, index))}
        </div>
    )
}

export default Messages;
