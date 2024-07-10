const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {


});

router.post("/login", async (req, res) => {

    try{
        const userExists = await User.findOne({email: req.body.email})

        if(userExists){
            res.send({
                sucess: false,
                message: "User already exists , Try to login"
            })
        }

        //hashing
        //getnearting salt
        const salt = await bcrypt.genSalt(10)
        //hashing password

        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
            await newUser.save()
            res.json("User has been registered successfully")
        }
        catch(err){
            responce.json("Some error occured :"+err)
        }
  
});


module.exports = router;