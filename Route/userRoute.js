const express = require("express");

const { CheckForLogin } = require("../AuthControl/CheckForLogin")
const checkForUser = require("../Query/checkForUSerWhileFollow");
const followUser = require("../Query/Follow");
const LogIn = require("../Query/LogIn");
const GetUserByName = require("../Query/GetUserByName");
const { CreateUser } = require("../Query/CreateUser");
const UnFollow = require("../Query/unFollow");

const UserRouter = express.Router()

UserRouter.route("/")
    .post(CreateUser)
    .get(GetUserByName)

UserRouter.route("/follow/")
    .post(CheckForLogin, checkForUser, followUser)
    .delete(CheckForLogin,UnFollow)
UserRouter.route("/login")
    .post(LogIn)


//check for folowing user is present or not
// check wheather logedIn user only following other not for another user he making a request (only he can make reqest to follow other) 
module.exports = UserRouter