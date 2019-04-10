const {Article} = require("../models");

class ArticleController{

    static findAll(req,res){
        let query = {};
        if(req.query.title){
            query.title = {
                '$regex' : req.query.title, 
                '$options' : 'i' 
            }
        }

        Article.find(query)
        .then(results=>{console.log(results)
            res.status(200).json(results)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message: "Failed while getting data",
                error: err.stack
            })
        })
    }
    static create(req,res){
        let data = {
            title : req.body.title,
            content : req.body.content,
            tags: req.body.tags,
            isPublished: req.body.isPublished
        }
        Article.create(data)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message: "Failed while creating data",
                error: err.stack
            })
        })
    }
    static delete(req,res){
        let id = req.params.articleId;

        Article.findByIdAndDelete(id)
        .then(result=>{
            res.status(200).json({
                message:"Delete Success"
            })
        })
        .catch(err=>{
            console.log(err.stack)
            res.status(500).json({
                message: "error while deleting data"
            })
        })
    }
    static update(req,res){
        let updateVal = {}
        let id = req.params.articleId;
        req.body.title && (updateVal.title = req.body.title);
        req.body.content && (updateVal.content = req.body.content);
        req.body.tags && (updateVal.tags = req.body.tags);

        Article.findByIdAndUpdate(id,updateVal,{new:true})
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err.stack);
            res.status(500).json({
                message : "error while update",
            })
        })
    }
}

module.exports = ArticleController;