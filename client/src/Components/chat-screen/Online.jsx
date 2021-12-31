import React from "react";

function Online({ online }) {
    return (
        <div id='online'>
            {online.map((user, index) => (
                <div key={`participant ${index}`} >{user}</div>
            ))}
        </div>
    )
}

export default Online;
