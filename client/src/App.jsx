import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Chat from './Components/Chat';

function App() {
    const [user, setUser] = useState();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login setUser={setUser}/>} />
                <Route path='/chat' element={
                    user ? 
                        <Chat user={user} /> :
                        <Login setUser={setUser} />
                }/>

            </Routes>
        </BrowserRouter>
    )
}

export default App;
