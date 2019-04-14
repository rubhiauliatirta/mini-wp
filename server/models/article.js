const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const generateRandom = require("../helpers/generateRandom")

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
    featured_image:{
        type:String
    },
    slug:{
        type: String
    },
    isPublished:{
        type:Boolean
    },
    clap_count:{
        type: Number,
        default:0
    }
},{timestamps: true})

articleSchema.pre("save", function(next){
    this.slug = this.title.split(" ").join("-") + generateRandom();
    next()
})
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
