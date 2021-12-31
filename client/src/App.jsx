import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

function App() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8080', {
            query: {
                user: Math.random()
            }
        });
        
        socketRef.current.on('messageBack', (message) => {
            setMessages(msgs => [...msgs, message])
        })
    }, [])

    const sendMessage = () => {
        socketRef.current.emit('message', {name: 'someone', message: 'hello'});
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
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default App;
