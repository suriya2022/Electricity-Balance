const express = require('express')
const rateLimit = require('express-rate-limit')



const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10 ,
    handler: function (req, res, ) {
        return res.status(429).json({
          error: 'API has exceeded more than 10 times in the last minute.'
        })
    }
})


const app = express()


app.use(apiRequestLimiter)

app.post("/generateUuid", (req, res) => {
    res.send({
        "uuid":"ef4f3c7e-e7c8-4c4d-862d-d4a444fdaffd"
    })
})


app.get("/check-balance",(req,res)=>{

    const appUUID = "ef4f3c7e-e7c8-4c4d-862d-d4a444fdaffd";

    if(appUUID == req.query.uuid){
    var data = {
        "message":"API check was successful.",
        "balance" : Math.floor( Math.random() * (2000-1000) + 1000),
    };
    res.send(data)
    }else{
        res.status(403)
        res.send({
            "message":"UUID is not recognised."
        })
    }
    
})


app.listen(1337, () => console.log("app is listening for incoming connetions"));


