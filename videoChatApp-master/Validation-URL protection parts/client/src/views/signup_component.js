
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);

    fetch("http://localhost:8000/user/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.status === "ok") {
          //alert("Registration Successful");
          toast.success("signup successful", toastOptions);

          //window.location.href = "/";
          window.setTimeout(function() {
            window.location.href = '/';
        }, 3000);

        }else if(fname == "" || lname =="" || email == "" || password == ""){
          toast.error("All fields must be filled", toastOptions);
           
         } else if (!/^[\w+\.]+@([\w+]+\.)+[\w-]{2,4}$/.test(email)){
           toast.error("please provide a valide email", toastOptions);
 
         }else if (!/^[a-zA-Z]*$/.test(fname)){
           toast.error("first name must be charactors", toastOptions);
 
         }else if (!/^[a-zA-Z]*$/.test(lname)){
           toast.error("last name must be charactors", toastOptions);
 
         }else if (password.length < 8){
           toast.error("passowrd must be 8 charactors", toastOptions);
 
         }else if (email.match){
           toast.error("Already User registered!", toastOptions);
         }
          
      });
  }
  render() {
    return (
      <>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => this.setState({ lname: e.target.value })}
          />
        </div>

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

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">Sign in</a>
        </p>
      </form>

      </div>
      </div>
      </div>
      <ToastContainer/>
      </>
    );
  }
}