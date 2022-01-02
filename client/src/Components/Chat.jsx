import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import Online from "./chat-screen/Online";
import Messages from "./chat-screen/Messages";
import SendMessage from "./chat-screen/SendMessage";
import './Chat.css';

function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [online, setOnline] = useState([]);
    const [privateMessage, setPrivateMessage] = useState();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('https://eg-chat.herokuapp.com', {
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

        socketRef.current.on('noUser', () => setPrivateMessage(''))

    }, [user])

    return (
        <div id='chat-screen'>
            <Messages user={user} messages={messages}/>
            <SendMessage user={user} socketRef={socketRef} privateMessage={privateMessage} setPrivateMessage={setPrivateMessage} />
            <Online user={user} online={online} setPrivateMessage={setPrivateMessage} />
        </div>
    )
}

export default Chat;
