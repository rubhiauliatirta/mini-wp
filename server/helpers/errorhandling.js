var nodeError = ["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]
var mongooseError = ["MongooseError","DisconnectedError","DivergentArrayError","MissingSchemaError","DocumentNotFoundError","MissingSchemaError","ObjectExpectedError","ObjectParameterError","OverwriteModelError","ParallelSaveError","StrictModeError","VersionError"]
var mongooseErrorFromClient = ["CastError","ValidatorError","ValidationError"];
//kalau sempat jangan lupa research ttg jwt error yaa
var jwtError = ["TokenExpiredError","JsonWebTokenError","NotBeforeError"]

function nodeErrorMessage(message){
    switch(message){
        case "Token is undefined":{
            return 403;
        }
        case "User not found":{
            return 403;
        }
        case "Not Authorized":{
            return 401;
        }
        case "Email is Invalid!":{
            return 400;
        }
        case "Password is Invalid!":{
            return 400
        }
        default :{
            return 500;
        }
    }
}

module.exports = function(errorObject){
    console.log("===ERROR OBJECT===")
    console.log(errorObject)
    console.log("===ERROR STACK===")
    console.log(errorObject.stack);

    let statusCode = 500;  
    let returnObj = {
        error : errorObject
    }
    if(jwtError.includes(errorObject.name)){
        statusCode = 403;
        returnObj.message = "Token is Invalid"
        returnObj.source = "jwt"
    }
    else if(nodeError.includes(errorObject.name)){
        returnObj.error = JSON.parse(JSON.stringify(errorObject, ["message", "arguments", "type", "name"]))
        returnObj.source = "node";
        statusCode = nodeErrorMessage(errorObject.message);
        returnObj.message = errorObject.message;
    }else if(mongooseError.includes(errorObject.name)){
        returnObj.source = "database"
        returnObj.message = "Error from server"
    }else if(mongooseErrorFromClient.includes(errorObject.name)){
        returnObj.source = "database";
        errorObject.message ? returnObj.message = errorObject.message : returnObj.message = "Bad Request"
        statusCode = 400;
    }else{
        returnObj.source = "unknown error";
        returnObj.message = "Something error";
    }
    returnObj.statusCode = statusCode;
    
    return returnObj;


}