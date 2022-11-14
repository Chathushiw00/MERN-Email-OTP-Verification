require('dotenv').config();
const mongoose = require("mongoose");

const mongoUrl =
 "mongodb+srv://chathushi:Chathu%40123@cluster0.2t2l4nr.mongodb.net/?retryWrites=true&w=majority";


 mongoose
 .connect(mongoUrl, {
   useNewUrlParser: true,
 })
 .then(() => {
   console.log("Connected to database");
 })
 .catch((e) => console.log(e));