const jwtDecode = require("jwt-decode")
const { userModel, followModel } = require("../backendConn")
const sendResponse = require("./SendResponse")

const checkForUser = async (req, res, next) => {
    try {
        if (req.body.userName && req.body.following) {
            //chech both userName and following  name  are present in database
            let checkUserPresence = await userModel.find({ userName: { $in: [req.body.userName, req.body.following] } })
            console.log(req.body.userName , req.body.following,checkUserPresence,req.body.userName , jwtDecode(req.session.token).userName)
            //both are present in database
            if (checkUserPresence.length === 2 && req.body.userName === jwtDecode(req.session.token).userName) {
                // check For USer Trying To Follow the same user again 
                let flag = await followModel.find(req.body)
                if (flag.length === 0) {
                    next()
                    return
                } else {
                    sendResponse(res, "", "Following a same user again is not allowed", 0)
                }
            }
            else {
                sendResponse(res, "", "invalid query", 0)
            }
        }
    } catch (err) {
        console.log(err)
        res.send({
            data: "somthing went wrong",
            statusCode: 0
        })
    }
}

module.exports = checkForUser