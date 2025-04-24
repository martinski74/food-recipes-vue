<template>
  <section class="search-container">
    <h2 class="styles['search-header']">Search Recipes</h2>
    <form @submit.prevent="handleSearch">
      <input
        class="search-input"
        type="text"
        id="search"
        name="search"
        placeholder="Search for recipes..."
        v-model="query"
      />
      <button class="search-button" type="submit">Search</button>
    </form>
    <div class="search-results">
      <RecipeItem
        v-for="recipe in recipeStore.recipes"
        :key="recipe._id"
        :recipe="recipe"
      />
      <p v-if="recipeStore.recipes.length === 0" class="no-match">
        There are no recipes found!
      </p>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import RecipeItem from "@/components/RecipeItem.vue";
import { useRecipeStore } from "@/stores/recipes.js";

const recipeStore = useRecipeStore();

const query = ref("");

const handleSearch = () => {
  if (!query.value) {
    // Reset to all recipes if query is empty
    recipeStore.getAllRecipes();
  }
  const filtered = recipeStore.recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.value.toLowerCase())
  );
  recipeStore.recipes = filtered;
  query.value = ""; // Clear the input field after search
};

onMounted(() => {
  recipeStore.getAllRecipes();
});
</script>

<style lang="css" scoped>
.search-container {
  text-align: center;
}
.search-header {
  color: aliceblue;
  font-size: 30px;
}
.search-input {
  width: 60%;
  padding: 0.75em;
  margin-bottom: 1em;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
}

.search-button {
  background: #b25ab3;
  color: white;
  padding: 0.75em 1.5em;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1em;
  transition: background 0.3s, transform 0.3s;
}
.search-button:hover {
  background: #db34a2;
}

.search-results {
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2em;
  justify-items: center;
}

.no-match {
  font-size: 35px;
  font-style: italic;
  margin-top: 50px;
  border-top: 1px solid #ddd;
  color: #ddd;
  padding-top: 70px;
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
