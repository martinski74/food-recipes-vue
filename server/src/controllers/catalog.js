const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeById,
  getRecentRecipes,
  getSearchRecipes,
} = require("../services/recipe");

const catalogRouter = Router();

catalogRouter.get("/catalog", async (req, res) => {
  const recipes = await getAllRecipes();
  for (const recipe of recipes) {
    recipe.isAuthor = req.user && req.user._id == recipe.owner.toString();
  }

  res.json(recipes);
});

catalogRouter.get("/details/:id", async (req, res) => {
  const recipe = await getRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  recipe.isAuthor = req.user && req.user._id == recipe.owner.toString();
  res.json(recipe);
});

catalogRouter.get("/recent", async (req, res) => {
  const recipes = await getRecentRecipes();
  res.json(recipes);
});

module.exports = { catalogRouter };
