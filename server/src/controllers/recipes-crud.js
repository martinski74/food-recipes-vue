const { Router } = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../services/recipe");
const { body, validationResult } = require("express-validator");
const recipeRouter = Router();

recipeRouter.post("/create", async (req, res) => {
  const recipe = await createRecipe({ ...req.body });
  res.json(recipe);
});

recipeRouter.post("/edit/:id", async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await updateRecipe(recipeId, req.body);
  res.json(recipe);
});

recipeRouter.get("/delete/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const response = await deleteRecipe(recipeId);
    res.json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = { recipeRouter };
