const { Recipe } = require("../models/Recipe");

async function getAllRecipes() {
  const recipes = await Recipe.find().lean();
  return recipes;
}

const getRecipeById = async (id) => {
  const recipe = await Recipe.findById(id).lean();
  return recipe;
};

const createRecipe = async (recipeData) => {
  const recipe = new Recipe(recipeData);
  await recipe.save();
  return recipe;
};

const updateRecipe = async (recipeId, recipeData) => {
  const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, recipeData, {
    new: true,
  });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  await recipe.save();
  return recipe;
};

const deleteRecipe = async (recipeId) => {
  const resul = await Recipe.findByIdAndDelete(recipeId);
  return resul;
};

const getRecentRecipes = async () => {
  const recipes = await Recipe.find().sort({ _id: -1 }).limit(3).lean();
  return recipes;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecentRecipes,
};
