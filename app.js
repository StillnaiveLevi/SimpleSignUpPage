const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const appRoutes = require('./routes/appRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Your MongoDB is connected successfully!');
}).catch(err=>{console.log(err)});



app.use('/signup', appRoutes);





const port = process.env.PORT || 5000;
app.listen(port, (req, res)=>{
    console.log(`your app is listening through port ${port}`);
})