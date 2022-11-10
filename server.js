//mongodb
require("./config/db");

const app = require("express")();
const port = process.env.PORT || 5000;

//CORS
const cors = require("cors");
app.use(cors());

const userRouter = require("./api/User");

//for accepting past form data
const bodyParser = require("express").json;
app.use(bodyParser());

app.use("/user", userRouter);

app.listen(5000,() => {
    console.log("server running on 5000");
})