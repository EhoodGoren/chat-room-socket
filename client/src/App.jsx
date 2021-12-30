import React, { useEffect, useRef } from "react";
import io from 'socket.io-client';

function App() {
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8080/');
        
        socketRef.current.on('messageBack', (data) => {
            console.log(data);
        })
    }, [])
    const sendMessage = () => {
        socketRef.current.emit('message', 'hello');
    }
    return (
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default App;
