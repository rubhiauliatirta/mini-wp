const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const {User} = require("../models")

module.exports = function(req,res,next){
    if(req.body.idtoken){
        client.verifyIdToken({
            idToken: req.body.idtoken,
            audience: process.env.CLIENT_ID, 
        }).then(ticket=>{
            payload = ticket.getPayload();
            // const userid = payload['sub'];
            return User.findOne({
                email:payload.email
            })
        }).then(result=>{
            if(result){
                return result
            }else{
                return User.create({
                    name: payload.name,
                    password: process.env.DEFAULT_PASSWORD,
                    email: payload.email,
                    imageUrl: payload.picture,
                    accountType:"google"
                })          
            }
        })
        .then(result=>{
            req.body.email = result.email;
            req.body.password = process.env.DEFAULT_PASSWORD;  
            next();
        })
        .catch(err=>{
            next(err);
        })
    }else{
        next()
    }
}