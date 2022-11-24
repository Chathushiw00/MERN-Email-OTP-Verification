import React, { useEffect, useRef, useState } from 'react';
import PeerJS from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./views/login_component";
import SignUp from "./views/signup_component";
import UserDetails from "./views/userDetails";
import VerifyOTP from "./views/verifyOTP";
import Landing from './views/Landing';
import Room from './views/Room';

function App() {
  const peerInstance = useRef(null);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
      const userId = uuidv4();
      // save peer instance into ref
      peerInstance.current = new PeerJS(userId, {
          host: process.env.REACT_APP_BACKEND_PEER_HOST,
          port: process.env.REACT_APP_BACKEND_PEER_PORT,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
      });
      peerInstance.current.on('open', (id) => {
          setCurrentUserId(id);
      });
  }, []);
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/verifyOTP" element={<VerifyOTP />} />
              <Route path="/userDetails" element={<UserDetails />} />    
              <Route path="/landing" element={<Landing currentUserId={currentUserId}/>}/>
              <Route path="/rooms/:roomId" element={<Room currentUserId={currentUserId} peerInstance={peerInstance.current}/>}/>
            </Routes>
     </div>
       
    </Router>
  );
}

export default App;
