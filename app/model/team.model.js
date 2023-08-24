const mongoose = require("mongoose")
const TeamSchema = new message.Schema({
    first_name:{type:String},
    last_name:{type:String},
    username: {type:String, required:true, unique:true},
    mobile: {type:String, required:true, unique:true},
    roles: {type:String, default:["USER"]},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    skills: {type:String, default:[]},
    team: {type:String, default:[]}
})
const userModel = mongoose.model("user", userSchema)
module.exports ={
    userModel
}