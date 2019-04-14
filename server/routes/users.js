const routes = require("express").Router();
const auth = require("../middlewares/auth");
const UserController = require("../controllers/users");
const googleSignIn = require("../middlewares/thirdpartylogin");

//REST API HERE
routes.post("/login", googleSignIn ,UserController.login)
routes.post("/register", UserController.register)
routes.post("/logout", auth.authentication, UserController.logout)
routes.get("/user", auth.authentication, UserController.getUser)


module.exports = routes;