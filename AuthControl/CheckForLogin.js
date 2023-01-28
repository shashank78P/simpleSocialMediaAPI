const jwtDecode = require("jwt-decode")
const { userModel } = require("../backendConn")
const sendResponse = require("../Query/SendResponse")

const CheckForLogin = async (req, res, next) => {
    try {
        if (req.session.token) {
            console.log("req.session.token",req.session.token)
            let data = await userModel.find({ userName: jwtDecode(req.session.token).userName })
            if (data.length > 0) {
                next()
                return
            }
        }
        res.send({
            statuscode: 401,
            data: "Please LogIn !!!"
        })
    } catch (err) {
        console.log(err)
        sendResponse(res,"","Please LogIn !!!",0)
        return
    }
}

module.exports = { CheckForLogin }