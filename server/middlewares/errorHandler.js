const errorHelper = require("../helpers/errorhandling");

module.exports = function(err,req,res,next){
    console.log("+masuk error handler=")
    console.log(err.stack)

    let errorToSend = errorHelper(err);

    res.status(errorToSend.statusCode).json(errorToSend);

}