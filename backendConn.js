const mongoose = require("mongoose")
const userSchema = require("./Schema/UserSchema")
const followSchema = require("./Schema/followschema")

mongoose.set('strictQuery', false)

mongoose.connect("mongodb://localhost:27017/socialMedia")
.then(()=>{
        console.log('connected to mongo DB')
    })
.catch((err)=>{
    console.log(err)
})

const userModel = new mongoose.model("user",userSchema)
const followModel = new mongoose.model("follow",followSchema)

module.exports = {userModel,followModel}