const routes = require("express").Router();
const ArticleController = require("../controllers/articles");

//REST API HERE
routes.get("/", ArticleController.findAll)
routes.post("/", ArticleController.create)
routes.delete("/:articleId", ArticleController.delete)
routes.patch("/:articleId", ArticleController.update)

module.exports = routes;