import React from "react";
import './Online.css';

function Online({ online, setPrivateMessage }) {
    return (
        <div id='online' className='chat-section'>
            <h2>🟢 Online</h2>
            <span className='online-intro'>(Click on someone to send them a private message!)</span>
            {online.map((user, index) => (
                <div>
                    <input
                        type='button'
                        key={`participant ${index}`}
                        className='online-members'
                        onClick={() => setPrivateMessage(user)}
                        value={user}
                    />
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Online;
