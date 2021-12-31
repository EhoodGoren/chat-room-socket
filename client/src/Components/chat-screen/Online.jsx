import React from "react";

function Online({ online }) {
    return (
        <div id='online' className='chat-section'>
            <h2>🟢 Online</h2>
            {online.map((user, index) => (
                <div key={`participant ${index}`} >{user}</div>
            ))}
        </div>
    )
}

export default Online;
