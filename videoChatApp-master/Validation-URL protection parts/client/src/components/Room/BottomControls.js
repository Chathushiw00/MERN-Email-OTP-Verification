import React from 'react';
import { Grid, Button } from "@material-ui/core"
import MicIcon from "@material-ui/icons/Mic"
import MicOffIcon from "@material-ui/icons/MicOff"
import VideocamIcon from "@material-ui/icons/Videocam"
import VideocamOffIcon from "@material-ui/icons/VideocamOff"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const style = {
    position: 'fixed',
    width: '100%',
    padding: 20,
    bottom: 0
};

const BottomControls = ({ onLeave, toggleMute, toggleVideoMute, muted, videoMuted, }) => {
     return (
     //<div className="has-text-centered mt-5" style={style}>
    //         <button className="button is-danger mr-2" onClick={onLeave}>
    //             <span className="icon">
    //                 <i className="fas fa-phone-slash"/>
    //             </span>
    //             <span>Leave call</span>
    //         </button>
    //         <button className={`button is-${muted ? 'danger' : 'primary'} mr-2`} onClick={toggleMute}>
    //             <span className="icon">
    //                 <i className={`fas ${muted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
    //             </span>
    //             <span>{muted ? 'Unmute' : 'Mute'}</span>
    //         </button>
    //         <button className={`button is-${videoMuted ? 'danger' : 'primary'} mr-2`} onClick={toggleVideoMute}>
    //             <span className="icon">
    //                 <i className={`fas ${videoMuted ? 'fa-video-slash' : 'fa-video'}`}></i>
    //             </span>
    //             <span>{videoMuted ? 'Turn video on' : 'Turn video off'}</span>
    //         </button>
    //     </div>
    <div className="has-text-centered mt-5" style={style}>
    <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              color={muted ? "secondary" : "primary"}
              onClick={toggleMute}
            >
              {muted ? <MicOffIcon /> : <MicIcon />}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color={videoMuted ? "secondary" : "primary"}
              onClick={toggleVideoMute}
            >
              {videoMuted? <VideocamOffIcon /> : <VideocamIcon />}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="default"
              onClick={onLeave}
            >
              Leave
              <ExitToAppIcon />
            </Button>
          </Grid>
        </Grid>
        </div>
    );
};
export default BottomControls;
