const {User} = require("../models");
const tokenHelper = require("../helpers/tokenHandler")
const encryption = require("../helpers/encryption")

class UserController{
    static login(req,res,next){
        User.findOne({email: req.body.email})
        .then(result=>{
            if(!result){
                throw new Error("Email is Invalid!")
            }else{
                let token = tokenHelper.createToken({
                    _id: result._id,
                    email: result.email
                })
                if(encryption.validatePassword(req.body.password,result.password)){
                    res.status(200).json(composeReturn(token,result))
                }else{
                    throw new Error("Password is Invalid!")
                }
            }
        })
        .catch(err=>{
            next(err);
        })
    }
    static register(req,res,next){
        let body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(body)
        User.create(body)
        .then(result=>{
            let token = tokenHelper.createToken({
                _id: result._id,
                email: result.email
            })
            console.log(result)
            res.status(201).json(composeReturn(token,result))
        })
        .catch(err=>{
            next(err)
        })
    }
    static logout(req,res,next){
        res.status(200).json({
            message: "Successfully logout",
            accountType: req.body.user.accountType
        })
    }
    static getUser(req,res,next){
        res.status(200).json(req.body.user)
    }
}
function composeReturn(token,result){
    console.log("masuk return")
    return {
        token:token,
        username: result.name,
        imgSrc: result.imageUrl
    }
    
}
module.exports = UserController;