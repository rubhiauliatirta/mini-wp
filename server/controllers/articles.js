const {Article} = require("../models");

class ArticleController{

    static findAll(req,res,next){
        console.log(req.body.userIdFromAuth)
        let query = {
            userId: req.body.userIdFromAuth
        };
       
        if(req.query.title){
            console.log("masuk")
            query.title = {
                '$regex' : req.query.title, 
                '$options' : 'i' 
            }
        }else if(req.query.tag){
            console.log("sd")
            query.tags = req.query.tag
        }
        console.log("querq")
        
        console.log(query)

        Article.find(query).populate("userId")
        .then(results=>{
            console.log(results)
            res.status(200).json(results)
        })
        .catch(err=>{
            next(err)
        })
    }
    static create(req,res,next){
        let data = {
            title : req.body.title,
            content : req.body.content,
            tags: req.body.tags,
            featured_image: req.file ? req.file.cloudStoragePublicUrl : null,
            isPublished: req.body.isPublished,
            userId: req.params.userIdFromAuth
        }

        Article.create(data)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
    static delete(req,res, next){
        let id = req.params.articleId;

        Article.findByIdAndDelete(id)
        .then(result=>{
            res.status(200).json({
                message:"Delete Success"
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static update(req,res, next){
        let updateVal = {}
        let id = req.params.articleId;
        req.body.title && (updateVal.title = req.body.title);
        req.body.content && (updateVal.content = req.body.content);
        req.body.tags && (updateVal.tags = req.body.tags);
        req.body.isPublished && (updateVal.isPublished = req.body.isPublished)
        req.file && (updateVal.featured_image = req.file.cloudStoragePublicUrl)

        Article.findByIdAndUpdate(id,updateVal,{new:true})
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ArticleController;