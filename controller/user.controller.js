const express = require('express');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

/******************************************************
 * @home
 * @route http://localhost:8080/user/home
 * @description home API for Test
 * @returns Test Message
 ******************************************************/
const home = async(req,res) => {
    try{
        res.status(200).json({message : 'This is a Test API....' });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({ messsage : 'Internal Server Error...' });
    }
}

/******************************************************
 * @sign_up
 * @route http://localhost:8080/user/sign_up
 * @description API for Create a New User
 * @returns Success Message and new User object
 ******************************************************/
const sign_up = async(req,res) => {
    try{
        const { username, mobile, email, password } = req.body;
        if (!username || !mobile || !email || !password ) {
            return res.status(400).json({ message: 'All Fields are required...' });
        }
        const exists_user = await User.findOne({
            email: email
        });
        if (exists_user) {
            return res.status(400).json({message: 'Email Allready Exists in DB...' });
        }
        const new_user = new User({
            username: username,
            mobile: mobile,
            email: email,
            password: password,
        });
        await new_user.save();
        res.status(200).json({ meassage: 'User Added Successfully...', new_user });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({ message: 'Internal Server error...' });
    }
}

//Generate a Authenticated Token
const GenerateAuthToken = async (user) => {
    const token = jwt.sign(
        { _id: user._id, email: user.email },
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY1NDQwYTQ1Zjg1NzQ0YWUwYmJjYmIiLCJlbWFpbCI6Im11Y2hoYWxzYWdhckBnbWFpbC5jb20iLCJpYXQiOjE3MTc5MTQ2NDYsImV4cCI6MTcxNzkxODI0Nn0.LvVD6qGZj0AZOVU62fqw0PDHD4M6t__ZrgJXQ6RMDjk',
        { expiresIn: '1h' }
    );
    return token;
};

/******************************************************
 * @sign-in
 * @route http://localhost:8080/user/sign-in
 * @description API for Sign-in a User and Generate a Token
 * @returns Success Message and return Auth Token
 ******************************************************/
const sign_in = async(req,res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password both required....' });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Email and Password not valid.' });
        }
        const token = await GenerateAuthToken(user);
        res.status(200).json({ message: 'Login Success...', token });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({ message: 'Internal Server error...' });
    }
}

module.exports = { home, sign_up, sign_in };