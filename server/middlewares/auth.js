const tokenHandler = require("../helpers/tokenHandler");
const {User} = require("../models");
const {Article} = require("../models")

module.exports = {
    authentication : function(req,res,next){
        try{
            let user = tokenHandler.decodeToken(req.headers.authorization)
            User.findOne({_id:user._id})
            .then(result=>{
                if(result){
                    
                    req.body.userIdFromAuth = result._id;
                    req.body.user = result;
                    req.params.userIdFromAuth = result._id
                    console.log(req.body.tags, "ini kogns")
                    next()
                }else{
                    throw new Error("User not found")
                }
            })
        }catch(err){
            next(err)
        }
       
    },
    authorization : function(req,res,next){  
        let id = req.body.userIdFromAuth;
        let articleId = req.params.articleId
       
        console.log(req.body.tags)

        Article.findOne({_id:articleId})
        .then(result=>{
            if(id.toString()===result.userId.toString()){
                next();
            }else{
                throw new Error("Not Authorized")
            }         
        })
        .catch(err=>{
            next(err)
        })
    }

}