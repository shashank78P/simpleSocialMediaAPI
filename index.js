const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")

const UserRouter = require("./Route/userRoute")

const app = express()



//middle wares
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())


app.use(session({
    secret : "Social media app by Shashank P",
    resave : false,
    saveUninitialized : true,
    cookie : { secure : false ,maxAge : 1000*360}
}))

app.use("/users",UserRouter)

app.use((req,res,next)=>{
    console.log(req.headers)
    next()
})

app.listen(3001,(res,err)=>{
    if(!err){
        console.log("listening to port 3001");
    }
    else{
        console.log(err)
    }
})

