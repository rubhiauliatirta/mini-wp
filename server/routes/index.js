const routes = require("express").Router();

//routes.use("/users", require("./users"));
routes.use("/articles", require("./articles"));
routes.use("/users", require("./users"));

module.exports = routes