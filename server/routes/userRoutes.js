const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {


});

router.post("/login", async (req, res) => {

    try{
        const newUser = new User(req.body)
            await newUser.save()
            res.json("User has been registered successfully")
        }
        catch(err){
            responce.json("Some error occured :"+err)
        }
  
});


module.exports = router;