import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Online from "./chat-screen/Online";
import Messages from "./chat-screen/Messages";
import SendMessage from "./chat-screen/SendMessage";

function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [online, setOnline] = useState([]);
    const socketRef = useRef();

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

    // const sendPrivateMessage = (e) => {
    //     socketRef.current.emit('privateMessage', {
    //         name: user,
    //         message: messageInput.current.value,
    //         target: e.target.innerText
    //     });
    //     messageInput.current.value = '';
    // }

    return (
        <div>
            <Messages messages={messages}/>
            <SendMessage user={user} socketRef={socketRef} />
            <Online online={online} />
        </div>
    )
}

export default Chat;


