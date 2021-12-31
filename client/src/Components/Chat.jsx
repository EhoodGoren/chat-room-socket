import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';


function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [online, setOnline] = useState([]);
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

        socketRef.current.on('onlineUpdate', (users) => {
            setOnline(users);
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

    const sendPrivateMessage = (e) => {
        socketRef.current.emit('privateMessage', {
            name: user,
            message: messageInput.current.value,
            target: e.target.innerText
        });
        messageInput.current.value = '';
    }

    return (
        <div>
            {messages.map(({ name, message }, index) => generateMessage(name, message, index))}
            <form onSubmit={sendMessage}>
                <input ref={messageInput} placeholder='Enter messages' />
                <button onClick={sendMessage}>Send</button>
            </form>
            {online.map((user, index) => (
                <div key={`participant ${index}`} onClick={sendPrivateMessage}>{user}</div>
            ))}
        </div>
    )
}

export default Chat;


