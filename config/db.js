require('dotenv').config();
const mongoose = require("mongoose");

const mongoUrl =
 "mongodb+srv://chathushi:Chathu%40123@cluster0.2t2l4nr.mongodb.net/?retryWrites=true&w=majority";
 //here my password is Chathu@123 == in order to connect to this URI you need to encode @ symbol(special charactor) ==> to %40
 

 mongoose
 .connect(mongoUrl, {
   useNewUrlParser: true,
 })
 .then(() => {
   console.log("Connected to database");
 })
 .catch((e) => console.log(e));