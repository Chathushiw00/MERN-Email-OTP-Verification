import React, { useCallback,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomAPI } from "../../api/room";

const Landing = ({ currentUserId }) => {

  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    //eslint-disable-next-line
    if ((localStorage.length == "")) {
    window.location.href = "./sign-in";
  } //url
}, []);

    const navigate = useNavigate()

  
    const handleLogoutBtnClick = useCallback(async () => {
      console.log('Logoutbtn clicked');
      window.location.href = "./sign-in";
      window.sessionStorage.clear();
      window.localStorage.clear();
    },[]);

    const joinRoom = useCallback(async () => {
      try {
          
          if(roomId !== ""){
            navigate(`/rooms/${roomId}`);
          }else{
            alert("Enter Room Id")
          }   
      }
      catch (error) {
          console.error(error);
      }
  }, [roomId, navigate]);

    const createRoom = useCallback(async () => {
        try {
            const roomInformation = await createRoomAPI(currentUserId);
            navigate(`/rooms/${roomInformation.roomId}`);
        }
        catch (error) {
            console.error(error);
        }
    }, [currentUserId, navigate]);

    return (
      <div className="container">
      <h2>Meet Your Friends</h2> 
         <input type="text" placeholder="Enter Room Code" onChange={(e) =>setRoomId(e.target.value)}/>
         
          <button onClick={createRoom} className="button is-success">Create a room</button>

          <button type="submit" onClick={joinRoom}>
            Join
          </button>

             
        <form  className="box2" >
         
         <button  type="submit" variant="primary" onClick={handleLogoutBtnClick}>
         Log Out
         </button>   
          
        </form> 
      </div>
      );
};
export default Landing;
