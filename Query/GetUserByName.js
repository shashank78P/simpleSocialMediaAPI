const jwtDecode = require("jwt-decode")

const { userModel, followModel } = require("../backendConn");
const FollowFilter = require("../filters/followFilter");
const sendResponse = require("./SendResponse");

const elseCondnData = async (req, res,userDetails) => {
    let data = await FollowFilter(req.query.username)
    data.push(userDetails[0])
    sendResponse(res, data, "", 200)
    return
}

// note here req.query.username is a name of the searching user
//and jwtDecode(req.session.token).userName is name of the loged in user 

const GetUserByName = async (req, res, next) => {
    try {
        let userDetails = await userModel.find({ userName: req.query.username }, { password: 0, confirmPassword: 0 });
        //if login user is not searching for his own profile
        if (req.query.username !== jwtDecode(req.session.token).userName) {

            //who has a permission to view other user data? 
            // 1. both must have follow each other
            // 2. either one has to follow
            let hasPerMissionToAcessFullData = await followModel.find({
                userName: { $in: [req.query.username, jwtDecode(req.session.token).userName] },
                following: { $in: [req.query.username, jwtDecode(req.session.token).userName] }
            })

            //if logedin user has no connection (not following or follower) with searched user
            //then has no permission to view data
            if (hasPerMissionToAcessFullData.length === 0) {
                // now he can see only basic details 
                //not the list followers or following List of an searched user
                let userFollowInfo = await FollowFilter(req.query.username)
                delete userFollowInfo[0]?.list
                let data = []
                data.push({ userName: userDetails[0].userName, ...userFollowInfo[0] })
                console.log(data)
                sendResponse(res, data, "", 200)
                return
            }
            //both are mutually connected each other
            else {
                if (req.query.followers) {
                    let data = await followModel.aggregate([
                        {
                            $match: { following: req.query.username }
                        },
                        {
                            $group: {
                                _id: "$following",
                                followers: { $push: "$$ROOT.userName" },
                                followersCount: { $sum: 1 }
                            }
                        }
                    ])
                    sendResponse(res, data, "", 200)
                    return
                }

                //to get user list of following
                else if (req.query.following) {
                    let data = await followModel.aggregate([
                        {
                            $match: { userName: req.query.username }
                        },
                        {
                            $group: {
                                _id: "$userName",
                                following: {
                                    $push: "$$ROOT.following"
                                },
                                followingCount: { $sum: 1 }
                            }
                        }
                    ])
                    sendResponse(res, data, "", 200)
                    return
                }
                else {
                    elseCondnData(req, res,userDetails)
                    return
                }
            }
        }
        else {
            elseCondnData(req, res,userDetails)
        }
    } catch (err) {
        console.log(err)
        res.send({
            data: "invalid query",
            statusCode: 0,
        })
    }
}

module.exports = GetUserByName