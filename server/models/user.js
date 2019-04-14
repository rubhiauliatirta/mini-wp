const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const encryption = require("../helpers/encryption");

let userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    imageUrl:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
    },
    accountType:{
        type:String,
        default:"default"
    }
},{timestamps: true})

userSchema.pre("save", function(next){
    this.password = encryption.getHashedPassword(this.password)
    next()
})
userSchema.path('email').validate(async (value) => {
    let user =  await mongoose.models.User.findOne({email:value});
    return !user;
}, 'Email already exists');

const User = mongoose.model("User", userSchema);

module.exports = User