const { userModel } = require("../backendConn");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const LogIn = async (req, res, next) => {
    try {
        if (req.body.password.trim() && req.body.email.trim()) {
            let data = await userModel.find({ email: req.body.email })

            //matching password
            if (data.length ===1 && await bcrypt.compare(req.body.password, data[0].password)) {
                req.session.regenerate(() => {
                    console.log("session regenerated")
                })
                let token = JWT.sign({ userName: data[0].userName }, "wellcome back",
                    {
                        expiresIn: "1d"
                    })
                req.session.token = token
                res.send({
                    data: "LogIn Sucessful",
                    statusCode: 200
                })
            }
            else {
                res.send({
                    data: "Invalid LogIn",
                    statusCode: 401
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}

module.exports = LogIn