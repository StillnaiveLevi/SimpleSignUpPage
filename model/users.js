const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{type: String, required: true},
    username: {type: String, required: true, unique: true},
    email:{type:String, required:true, unique: true},
    phone:{type:String, required: true, unique: true},
    password: {type: String, reuired: true}
});

const user = mongoose.model('User', userSchema);
module.exports = user;