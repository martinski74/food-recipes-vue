const { recipeRouter } = require("../controllers/recipes-crud");
const { userRouter } = require("../controllers/user");
const { catalogRouter } = require("../controllers/catalog");

const configRoutes = (app) => {
  app.use(catalogRouter);
  app.use(recipeRouter);
  app.use(userRouter);
};
module.exports = { configRoutes };
