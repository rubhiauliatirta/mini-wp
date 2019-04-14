const routes = require("express").Router();
const ArticleController = require("../controllers/articles");
const auth = require("../middlewares/auth")
const upload = require("../helpers/images")

//REST API HERE
routes.get("/", auth.authentication, ArticleController.findAll)
routes.post("/",auth.authentication, upload.multer.single("image"),upload.sendUploadToGCS ,ArticleController.create)
routes.delete("/:articleId", auth.authentication, auth.authorization,  ArticleController.delete)
routes.patch("/:articleId", auth.authentication, auth.authorization, upload.multer.single("image"),upload.sendUploadToGCS, ArticleController.update)

module.exports = routes;