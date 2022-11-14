import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("http://localhost:3000/user/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        console.log(email);
        if (data.status == "FAILED") {
          alert("email hasn't been verified yet. check your inbox");
          window.localStorage.setItem("token", data.act);
          window.localStorage.setItem("otp", data.data.otp);
          window.localStorage.setItem("userId", data.data.userId);
          window.location.href = "./verifyOTP";

        } else if (data.status == "ok") {
          alert("signin successful");
          window.localStorage.setItem("token", data.act);
          window.location.href = "./userDetails";

        } else if(data.status == "Invalid Credentials"){
          alert("Email or password not matching");

        }else if (email == "" || password == "" ){
          alert("please enter email and password");

        } 
        //else if(req.body.email != email){
        //   alert("Email not matching");
        // }
       
          
        
      
    });
  }
  



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have an Account?<a href="/sign-up">Sign Up</a>
        </p>
      </form>
    );
  }
}
