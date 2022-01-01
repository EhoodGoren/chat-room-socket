import React from "react";
import './Online.css';

function Online({ user: originalUser, online, setPrivateMessage }) {
    const privateMessage = (user) => {
        if(user === originalUser) return;
        setPrivateMessage(originalUser);
    }
    return (
        <div id='online' className='chat-section'>
            <h2>💻 Online</h2>
            <span className='online-intro'>(Click on someone to send them a private message!)</span>
            {online.map((user, index) => (
                <div key={`participant ${index}`}>
                    <input
                        type='button'
                        className='online-members'
                        onClick={() => privateMessage(user)}
                        value={user}
                    />
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Online;
