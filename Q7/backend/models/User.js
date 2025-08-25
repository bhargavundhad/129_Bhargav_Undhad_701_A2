const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin : {type:Boolean,default:false}
});

module.exports = mongoose.model('user',UserSchema);