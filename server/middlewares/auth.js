const tokenHandler = require("../helpers/tokenHandler");
const {User} = require("../models");

module.exports = {
    authentication : function(req,res,next){

        let user = tokenHandler.decodeToken(req.headers.Authorization)

        if(user){
            User.findOne({_id:user.id})
            .then(result=>{
                if(result){
                    next()
                }
            })
            .catch(err=>{
                console.log(err.stack)
                res.status(403).json({
                    message: "User not found",
                })
            })
        }else{
            res.status(403).json({
                message: "token is invalid"
            })
        }
    },
    authorization : function(req,res,next){  
        
        
    }

}