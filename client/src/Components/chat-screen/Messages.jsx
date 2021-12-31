import React from "react";

function Messages({ messages }) {
    const generateMessage = (name, message, index) => {
        const { time, text } = message;
        if(!name){
            return <div key={`announcement ${index}`} className='announcements'>{message}</div>
        } else {
            return <div key={`message ${index}`} className='messages'>{time}  {name}: {text}</div>
        }
    }

    return(
        <div id='chat-messages'>
            {messages.map(({ name, message }, index) => generateMessage(name, message, index))}
        </div>
    )
}

export default Messages;
