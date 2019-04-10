require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());


mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
.then(function(success){
    console.log("succesfully connect to database")
})
.catch(function(err){
    console.log(err)
})

app.use("/", require("./routes"))

app.listen(PORT, function(){console.log("listen to port " + PORT)})