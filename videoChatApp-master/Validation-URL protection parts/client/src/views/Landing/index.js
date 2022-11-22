import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomAPI } from "../../api/room";

const Landing = ({ currentUserId }) => {
  
  if ((localStorage.length == "")) {
    window.location.href = "./sign-in";
  } //url
  
    const navigate = useNavigate()


  const handleLogoutBtnClick = useCallback(async () => {
    console.log('Logoutbtn clicked');
    window.location.href = "./sign-in";
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

    const createRoom = useCallback(async () => {
        try {
            const roomInformation = await createRoomAPI(currentUserId);
            navigate(`/rooms/${roomInformation.roomId}`);
        }
        catch (error) {
            console.error(error);
        }
    }, [currentUserId, navigate]);

    return (<div className="container pt-5">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          <p className="mb-5 is-size-1 has-text-centered">
            <strong className="has-text-white">Hi Welcome</strong>
          </p>
          <button onClick={createRoom} className="button is-success">Create a room</button>
        </div><br></br>

        <div>
         <button onClick={handleLogoutBtnClick} id='backbtn' variant="primary" type="submit">
            Logout
        </button>
      </div>
      </div>
    </div>);
};
export default Landing;
