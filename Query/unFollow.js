const jwtDecode = require("jwt-decode")
const { followModel } = require("../backendConn")

const UnFollow = async(req,res,next)=>{
    try {
        let data =await followModel.deleteOne({userName : jwtDecode(req.session.token).userName , following : req.query.userName})
        if(data?.deletedCount === 1){
            res.send({
                msg : "deleted sucessfull",
                statusCode :200
            })
        }
        else{
            res.send({
                msg : "Something went wrong",
                statusCode :0
            })
        }
    } catch (err) {
        console.log(err)
        res.send(err)

    }
}

module.exports = UnFollow;