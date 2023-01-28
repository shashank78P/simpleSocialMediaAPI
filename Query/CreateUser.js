const bcrypt = require("bcryptjs");
const { userModel } = require("../backendConn");

async function CreateUser(req, res, next) {
    try {
        if (req.body.password === req.body.confirmPassword) {
            //hashing a password
            req.body.password = await bcrypt.hash(req.body.password.trim().toString(), 12)

            //preventing confirmPassword from inserting into Database
            req.body.confirmPassword = "-"

            //query to insert a document into a collection
            userModel.insertMany({ ...req.body })
                .then(result => {
                    if (result.length > 0) {
                        res.send({
                            data: "Account Sucessfully created!!!",
                            statusCode: 200,
                        })
                    }
                })
                .catch(err => {
                    res.send({
                        data: err.message,
                        statusCode: 0,
                    })
                })
        } else {
            res.send({
                data: "password not matched!!!!",
                statusCode: 0,
            })
        }
    }
    catch (err) {
        console.log(err)
        res.send({
            data: err,
            statusCode: 0,
        })
    }
}

module.exports = {CreateUser}