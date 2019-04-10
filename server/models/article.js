const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

let articleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    title: {
        type:String
    },
    content:{
        type:String
    },
    tags:{
        type:[String]
    },
    isPublished:{
        type:Boolean
    }
},{timestamps: true})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
