const { followModel } = require("../backendConn");

const followUser = async (req, res, next) => {
    try {
        let data = await followModel.insertMany(req.body)
        if(data.length > 0){
            res.send({
                data : "Added to follow list",
                result : data,
                statusCode : 201
            })
            return
        }
    } catch (err) {
        res.send({
            data: err,
            statusCode: 0,
        })
    }
}

module.exports = followUser