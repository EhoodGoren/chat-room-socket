import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

function App() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8080', {
            query: {
                user: 'someone'
            }
        });
        
        socketRef.current.on('messageBack', (message) => {
            setMessages(msgs => [...msgs, message])
        })
    }, [])

    const sendMessage = () => {
        socketRef.current.emit('message', {name: 'someone', message: 'hello'});
    }

    return (
        <div>
            {messages.map(({ name, message }, index) => (
                <div key={`${message}${index}`}>{name}: {message}</div>
            ))}
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default App;
