import React, { useEffect, useRef } from 'react';
const RemoteUserVideo = ({ remoteStream }) => {
    const userVideoRef = useRef(null);
    useEffect(() => {
        if (userVideoRef.current && remoteStream) {
            userVideoRef.current.srcObject = remoteStream;
            userVideoRef.current.pause();
            userVideoRef.current.play().then(_ => {
                // Video playback started ;)
            })
                .catch(e => {
                console.log(e);
            });
        }
    }, [remoteStream]);
    return (
    <div className="v-container">
        <div className="video-container">
            <video ref={userVideoRef} style={{width:"300px"}} />
        </div>
    </div>);
};
export default RemoteUserVideo;
