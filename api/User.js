const express = require("express");
const router = express.Router();

//mongodb user model
const User = require("./../models/User");

//mongodb user  verification model
const UserVerification = require("./../models/UserVerification");

//email handler
const nodemailer = require("nodemailer");

//unique stirng
const {v4: uuidv4} = require("uuid");

//.env variables
require("dotenv").config();

//password handler
const bcrypt = require("bcrypt");

//path for static verified page
const path = require("path");
const UserOTPVerification = require("../models/UserOTPVerification");


//nodemailer transporter
// AUTH_EMAIL = chathushiw00@gmail.com
// AUTH_PASSWORD = 
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // user: "chathushiw00@gmail.com",
        // pass: "",
        //your password and email
    }
});

//teating success
transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    }else {
        console.log("ready for message");
        console.log(success);
    }
});

//signup
router.post("/signup", (req, res) => {
    let { name, email, password} = req.body;
    name =  name.trim();
    email = email.trim();
    password = password.trim();

    if(name == "" || email == "" || password == "" ) {
        res.json({
            status: "FAILED",
            message: "Empty input fields",
        });
    }else if ( !/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "invalide name entered",
        });
    }else {
        //checking if user alredy axsits
        User.find({ email })
        .then((result) => {
            if(result.length) {
                //a user already axists
                res.json({
                    status: "FAILED",
                    message: "user with the provided email already exists",
                });
            }else {
                //try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt
                .hash(password, saltRounds)
                .then((hashedpassword) => {
                    const newUser = new User({
                        name, 
                        email,
                        password: hashedpassword,
                        verified: false,
                    });
                    
                    newUser
                    .save()
                    .then((result) => {
                        //hadle account verification
                        sendOTPVerificationEmail(result, res);
                    })
                    .catch((err) => {
                        res.json({
                            status: "FAILED",
                            message:"an error occured while saving user account",
                        });
                    });
                    
                })
                .catch((err) => {
                    res.json({
                        status: "FAILED",
                        message:"an error occured while hashing password",
                    });
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message:"an error occured while checking existing user",
            });
        });
    }

});

//send otp verification email
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        //email options
        const mailOptions = {
            from: "chathushiw00@gmail.com",
            to: email,   
            subject: "Verify Your Email",
            html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up process.</p><p>this code <b>expires in 1 hour</b>.</p>`,
        };

        //hash the otp
        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        //save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "verification otp email sent",
            data: {
                userId: _id,
                email,
            },
        });
    }catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
};

//verify otp email
router.post("/verifyOTP", async (req, res) => {
    try{

        let { userId, otp } = req.body;
        if(!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        }else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            });
            if (UserOTPVerificationRecords.length <= 0) {
                //no record found
                throw new Error(
                    "Account record doesn't exist or has been verified already. Please sing up or log in"
                );
            }else {
                //user otp record exists
                const { expiresAt } = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;
                 
                if (expiresAt < Date.now()) {
                    //user otp record has expired
                    await UserOTPVerification.deleteMany({ userId });
                    throw new Error("code has expired. please request again");
                }else {
                   const validOTP = await bcrypt.compare(otp, hashedOTP);

                   if(!validOTP) {
                    //supplied otp is wrong
                    throw new Error("invalid code passed.check your inbox");

                   } else {
                    //success
                    await User.updateOne({ _id: userId }, {verified: true });
                    await UserOTPVerification.deleteMany({ userId });
                    res.json({
                        status: "VERIFIED",
                        message: "user email verified successfully",
                    });
                   }
                }
            }
        }
    }catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
});

//resend verification
router.post("/resendOTPVerificationCode", async (req, res) => {
    try{
        let { userId, email } = req.body;
        
        if( !userId || !email) {
            throw Error("empty user details are not allowed");
        } else {
            //deleting existing records and re-send
            await UserOTPVerification.deleteMany({ userId });
            sendOTPVerificationEmail({_id: userId, email }, res);
        }

    }catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
});






//send verification email
const sendVerificationEmail = ({_id, email}, res) => {
    //url to be used in the email
    const currentUrl = "http://localhost:5000/";

    const uniqueString = uuidv4() + _id;

    //email options
    const mailOptions = {
        from: "chathushiw00@gmail.com",
        to: email,
        subject: "verify your email",
        html: `<p> verify your email address to complete the signup and login into your account.</p><p>This link
        <b>expires in 6 hours</b>.</p><p>press <a href=${
            currentUrl + "user/verify/" + _id + "/" + uniqueString
        }>here</a> to proceed.</p>`,
    };

    //hash the uniqueString
    const saltRounds = 10;
    bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
        //set variable in userVerifiaction colletion
        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        newVerification
        .save()
        .then(()=> {
            transporter
            .sendMail(mailOptions)
            .then(() => {
                //email sent and verifiaction recored saved
                res.json({
                    status: "PENDING",
                    message:"verifiaction email sent",
                });
            })
            .catch((error) => {
                console.log(error);
                res.json({
                status: "FAILED",
                message:"verifiaction email failed",
            });         
        })
    })
        .catch((error)=>{
            console.log(err);
            res.json({
                status: "FAILED",
                message:"couldn't save verifiaction email data",
            });
        })
    })
    .catch(()=>{
        res.json({
            status: "FAILED",
            message:"an error occured while hashing email data",
        });
    })

};

//verify email
router.get("/verify/:userId/:uniqueString", (req, res) => {
let { userId, uniqueString } = req.params;

UserVerification
.find({userId})
.then((result) => {
    if(result.length > 0) {
        //user verification record exists so we proceed
        const {expiresAt} = result[0];
        const hashedUniqueString = result[0].uniqueString;

        //checking for expired unique string
        if(expiresAt < Date.now()){
            //recored has expired so we delete it
            UserVerification
            .deleteOne({userId})
            .then(result => {
                User
                .deleteOne({_id: userId})

                .then(() => {
                    let message = "Link has expired.please sign up again.";
                    //res.redirect('/user/verified/error=true&message=${message}');
                })

                .catch(error => {
                    let message = "Clearing user with expired unique string failed";
                    //res.redirect('/user/verified/error=true&message=${message}');
                })
            })
            .catch((error) => {
                console.log(error);
                let message = "an error occured while clearing expired user verification recored";
                //res.redirect('/user/verified/error=true&message=${message}');
            })
        }else {
            //valid record exists so we validate the user string
            //first compare the hashed unique string

            bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then(result => {
                if(result) {
                    //strings match

                    User
                    .updateOne({_id: userId}, {verified: true})
                    .then(() => {
                        UserVerification
                        .deleteOne({userId})
                        .then(() => {
                            res.sendFile(path.join(__dirname, "./../views/verified.html"));
                        })
                        .catch(error => {
                            console.log(error);
                            let message = "an error occured while finalizing successful verification";
                            //res.redirect('/user/verified/error=true&message=${message}');
                        })
                    })
                    .catch(error => {
                        let message = "an error occured while updating  user recored to show verified";
                        //res.redirect('/user/verified/error=true&message=${message}');
                    })


                }else {
                    //existing record incorrect verification details passed
                    let message = "Invalid verification details passed.check your inbox";
                    //res.redirect('/user/verified/error=true&message=${message}');
                }
            })
            .catch(error => {
                let message = "an error occured while comparing unique string";
                //res.redirect('/user/verified/error=true&message=${message}');
            })
        }

    }else {
        //user verification record doesn't exist
        let message = "Account record doesn't exist or has been verified already. please signup or login.";
       // res.redirect('/user/verified/error=true&message=${message}');
    }
})
.catch((error) => {
    console.log(error);
    let message = "an error occured while checking for existing user verification recored";
    //res.redirect('/user/verified/error=true&message=${message}');
})
});

//verified page route
router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./..views/verified.html"));
})

//signin

router.post("/signin", (req, res) => {
    let {email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if( email == "" || password == ""){
        res.json({
        
            status: "FAILED",
            message: "invalid credentials"
        });
    }else {
        //check if user exist
        User.find({ email })
        .then((data) => {
            if ( data.length) {
                //user exists

                //check if user is verifed

                if(!data[0].verified)  {
                    res.json({
                        status: "FAILED",
                        message: "email hasn't been verified yet. check your inbox"
                    });
                } else {
                    const hashedpassword = data[0].password;
                bcrypt
                .compare(password, hashedpassword)
                .then((result) => {
                    if(result)
                    {
                        //password match
                        res.json({
                            status: "SUCCESS",
                            message: " login success",
                            data: data,
                        });
                    }else {
                        res.json({
                            status: "FAILED",
                            message: "invalide password entered",
                        });
                    }
                })
                .catch((err) => {
                    res.json({
                    status: "FAILED",
                    message: " An error occured while comparing password",
                });
            });
                }
                
        }else {
            res.json({
                status: "FAILED",
                message: " invalid credentials entered",        
            });
        }
    })
    .catch((err) => {
        res.json({
        status: "FAILED",
        message: " An error occured while checking for existing user",
       });
    });
}

});

module.exports = router;

