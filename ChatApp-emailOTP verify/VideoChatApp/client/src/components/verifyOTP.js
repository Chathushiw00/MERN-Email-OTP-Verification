
import React, { Component } from "react";
import "./style.css";

export default class VerifyOTP extends Component {

  constructor(props) {
      super(props);
      this.state = {
          otp: "",
          userId: "",
         
      };
    
    }

  componentDidMount() {

    const userId = window.localStorage.getItem("userId");
    const otp = window.localStorage.getItem("otp");
    console.log(otp);
    console.log(userId);
    
    this.setState({otp:otp, userId:userId}); 
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       verifyOTP: "",
       
  //   };
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.reSendOTPSubmit = this.resSendOTPSubmit.bind(this);
  //}

//   resSendOTPSubmit(e) {
//     e.preventDefault();
//     const {userId, email} = this.state;
//     console.log(userId, email);
//     fetch("http://localhost:3000/user/resendOTPVerificationCode", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         userId,
//         email,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "OTP Send");
//         if (data.status == "ok") {
//           alert("re-send OTP successful");
//           window.localStorage.setItem("token", data.act);
//           window.location.href = "./VerifyOTP";
//         }
//       });
//   }


  //handleSubmit(e) {
    // e.preventDefault();
    // const { email, otp } = this.state;
    // console.log(email, otp);
    // fetch("http://localhost:3000/user/verifyOTP", {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
  
    //     token: window.localStorage.getItem("token"),
    //   }),
    // })
      // .then((res) => res.json())
      // .then((data) => {
    
      //   console.log(data, "verifyOTP");
      //   this.setState({ verifyOTP: data.data });
      // });


  //}
  
  render() {
    return (
      <form >
    
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    
        <h3>OTP Verification</h3>

        <div className="mb-3">
          <label>Your userId</label>
           <h3>{this.state.userId}</h3>
          <input
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Enter OTP Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            // onChange={(e) => this.setState({ otp: e.target.value })}
          />
        </div>
       <div className="OTP">
        <div className="otp-field">
        <script src="main.js"></script>
          <input type="text" maxLength="1"/>
          <input type="text" maxLength="1"/>
          <input type="text" maxLength="1"/>
          <input type="text" maxLength="1"/>
        
          </div>

        </div> <br></br>
        
          <button type="submit" variant="primary" className="btn btn-primary">
            Verify
          </button>{' '}
        
          <button type="submit" variant="primary" className="btn btn-primary">
            Re-Send
          </button>
        
        
        <p className="forgot-password text-right">
          Don't need to verify Now! <a href="/sign-in">Skip</a>
        </p>
      </form>
      
    );
}
}





// const OTPBox = () => {
//     const [otp, setOtp] = useState(new Array(4).fill(""));

//     const handleChange = (element, index) => {
//         if (isNaN(element.value)) return false;

//         setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//         //Focus next input
//         if (element.nextSibling) {
//             element.nextSibling.focus();
//         }
//     };

//     return (
//         <>
//             <Header title="Building OTP box using Hooks" />

//             <ExternalInfo page="otpBox" />

//             <div className="row">
//                 <div className="col text-center">
//                     <h2>Welcome to the channel!!!</h2>
//                     <p>Enter the OTP sent to you to verify your identity</p>

//                     {otp.map((data, index) => {
//                         return (
//                             <input
//                                 className="otp-field"
//                                 type="text"
//                                 name="otp"
//                                 maxLength="1"
//                                 key={index}
//                                 value={data}
//                                 onChange={e => handleChange(e.target, index)}
//                                 onFocus={e => e.target.select()}
//                             />
//                         );
//                     })}

//                     <p>OTP Entered - {otp.join("")}</p>
//                     <p>
//                         <button
//                             className="btn btn-secondary mr-2"
//                             onClick={e => setOtp([...otp.map(v => "")])}
//                         >
//                             Clear
//                         </button>
//                         <button
//                             className="btn btn-primary"
//                             onClick={e =>
//                                 alert("Entered OTP is " + otp.join(""))
//                             }
//                         >
//                             Verify OTP
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// };
