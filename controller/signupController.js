const express = require('express');
const mongoose = require('mongoose');
const user = require('../model/users');
const encryption = require('./encryption');


exports.signupForm =  (req,res)=>{
    res.render('signup.ejs');
}
exports.postForm=async (req, res)=>{
    const {fullname, username,email, phone, password} = req.body;
    try{
        const User = await user.findOne({username});
        if(User){
            return res.json({message:"user already exists"});
        }
        const encryptedName = encryption.caesarEncrypt(fullname);
        const encryptedUsername = encryption.vigenereEncrypt(username);
        const encryptedEmail =encryption.railFenceEncrypt(email);
        const encryptedPhone = encryption.columnarEncrypt(phone);
        const encryptedPassword =encryption.hillEncrypt(password);
        const newUser = new user({
            fullname: encryptedName,
            username: encryptedUsername,
            email: encryptedEmail,
            phone: encryptedPhone,
            password: encryptedPassword
        });
        await newUser.save();
        res.json({message: "User registered succcesfully!"});
    }catch(err){
        res.json({message: err.message});
    }
}