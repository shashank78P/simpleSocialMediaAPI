const sendResponse = (res,data,msg,statusCode) => {
    return res.send({ data,msg,statusCode})
}

module.exports = sendResponse