const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user required"]
    },
    following: {
        type: String,
        required: [true, "followering user required"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = followSchema