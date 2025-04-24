import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore = defineStore("recipes", () => {
  const recipes = ref([]);
  const recipe = ref({});
  const recent = ref([]);
  const isLoading = ref(false);

  const getAllRecipes = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get("/api/catalog");
      recipes.value = response.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getRecipeById = async (id) => {
    try {
      isLoading.value = true;
      const response = await axios.get(`/api/details/${id}`);
      recipe.value = response.data;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
    } finally {
      isLoading.value = false;
    }
  };
  const getRecentRecipes = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get("/api/recent");
      recent.value = response.data;
    } catch (error) {
      console.error("Error fetching recent recipes:", error);
    } finally {
      isLoading.value = false;
    }
  };
  // CRUD operations
  const createRecipe = async (recipeData) => {
    try {
      const response = await axios.post("/api/create", recipeData);
      recipes.value.push(response.data);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };
  const updateRecipe = async (id, recipeData) => {
    try {
      const response = await axios.post(`/api/edit/${id}`, recipeData);
      recipe.value = response.data;
      return response;
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  const deleteRecipe = async (id) => {
    try {
      const res = await axios.get(`/api/delete/${id}`);
      recipes.value = recipes.value.filter((recipe) => recipe._id !== id);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return {
    isLoading,
    recipe,
    recipes,
    recent,
    getAllRecipes,
    getRecipeById,
    getRecentRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
});
