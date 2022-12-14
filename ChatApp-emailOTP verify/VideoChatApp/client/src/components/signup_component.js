
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import { useNavigate } from "react-router-dom";

// export default function Register() {
// const navigate = useNavigate();

// const [values,setValues] = useEffect({
//   fname: "",
//   lname: "",
//   email: "",
//   password: "",
//   cfpassword: "",
// });

// useEffect(()=> {
//   if(localStorage.getItem(process.env.JWT_SECRET)){
//     navigate("/");
//   }
// }, []);

// const handleChange = (event) => {
//   setValues({ ...values, [event.target.name]: event.target.value });
// };

// const handleValidation = () => {
//   const { password, cfpassword } = values;
//   if (password !== cfpassword) {
//     alert("passowrd not matching");
//   }
// };



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

    fetch("http://localhost:3000/user/register", {
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
        console.log(data, "userRegister");

        if (data.status == "ok") {
          //alert("signup successful");

          toast.success("signup successful", toastOptions);

          window.localStorage.setItem("token", data.act);

          //window.location.href = "./sign-in";
          window.setTimeout(function() {
            window.location.href = './sign-in';
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
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter First name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last name"
            onChange={(e) => this.setState({ lname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
         
          <input
            type="password"
            name="password"
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
          Already registered?<a href="/sign-in">Sign in</a>
        </p>
      </form>
      <ToastContainer/>
      </>
    );
  }
}
