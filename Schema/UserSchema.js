const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userName: {
        type: String,
        validate: {
            validator: (val) => {
                return val.trim().length > 2
            },
            message: "Name must have more than 2 characters"
        },
        unique: [true, "Try with another User name"],
        required: [true, "User name is required"]
    },
    DOB: {
        type: Date,
        required: [true, "Date Of birth is required"],
        max: [Date.now(), "Date Of Birth Must be lesser than " + Date.now()]
    },
    email: {
        type: String,
        required: [true, "email id required"],
        unique: [true, "User with this email id already has Account!!! Please log in"],
        validate: [
            { validator: res => res.endsWith("@gmail.com"), message: "Email must always ends with @gmail.com" },
            { validator: res => res.trim().length > 12, message: "email length must be greater than 12" },
        ]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        validate: {
            validator: (val) => {
                return val.trim().length >= 7
            },
            message: "Password length must be greater than 7"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Required confirm Password"],
    },
    AccountCreatedOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = userSchema;