import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';


function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const messageInput = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8080', {
            query: {
                user
            }
        });
        
        socketRef.current.on('messageBack', (message) => {
            setMessages(msgs => [...msgs, message])
        })
    }, [user])

    const sendMessage = (e) => {
        e.preventDefault();
        socketRef.current.emit('message', {name: user, message: messageInput.current.value});
        messageInput.current.value = '';
    }

    const generateMessage = (name, message, index) => {
        if(!name){
            return <div key={`announcement ${index}`} className='announcements'>{message}</div>
        } else {
            return <div key={`message ${index}`} className='messages'>{name}: {message}</div>
        }
    }

    return (
        <div>
            {messages.map(({ name, message }, index) => generateMessage(name, message, index))}
            <form onSubmit={sendMessage}>
                <input ref={messageInput} placeholder='Enter messages' />
                <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default Chat;


