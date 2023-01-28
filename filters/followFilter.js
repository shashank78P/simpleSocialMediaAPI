const { followModel } = require("../backendConn")

const FollowFilter = async(userName,) => {
    return await followModel.aggregate([
        {
            $match:
            {
                $or: [
                    { userName: userName }, { following: userName }
                ]
            }
        },
        {
            $project: {
                _id: 0,
                userName: {
                    $cond: {
                        if: {
                            $eq: ["$userName", userName]
                        }, then:
                            "following",
                        else: "followers"
                    }
                },
                following: {
                    $cond: {
                        if: {
                            $eq: ["$userName", userName]
                        }, then:
                            "$following", else: "$userName"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$userName",
                list: {
                    $push: "$$ROOT.following"
                },
                count: { $sum: 1 }
            }
        }
    ])
}

module.exports = FollowFilter