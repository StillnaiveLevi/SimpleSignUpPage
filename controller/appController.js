const express = require('express');
const mongoose = require('mongoose');
const user = require('../model/users');
const encryption = require('./encryption');


exports.signupForm =  (req,res)=>{
    res.render('signup.ejs');
}
exports.postForm=async (req, res)=>{
    const {fullname, username, password} = req.body;
    try{
        const User = await user.findOne({username});
        if(User){
            return res.json({message:"user already exists"});
        }
        const encryptedPassword = encryption(password);
        const newUser = new user({
            fullname,
            username,
            password: encryptedPassword
        });
        await newUser.save();
        res.json({message: "User registered succcesfully!"});
    }catch(err){
        res.json({message: err.message});
    }
}