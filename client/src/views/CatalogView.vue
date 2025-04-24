<template>
  <div>
    <h3 class="catalog-heading">Recipe Catalog</h3>
    <div class="loader">
      <VueSpinnerOval v-if="recipeStore.isLoading" size="100" color="#bb86fc" />
    </div>
    <section class="recipes">
      <RecipeItem
        v-for="recipe in recipeStore.recipes"
        :key="recipe._id"
        :recipe="recipe"
      />
      <p v-if="!recipeStore.recipes.length" class="no-post">
        There are no recipes found yet!
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RecipeItem from "@/components/RecipeItem.vue";
import { useRecipeStore } from "@/stores/recipes.js";

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.getAllRecipes();
});
</script>

<style scoped>
.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 7em;
  padding-bottom: 50px;
  justify-items: center;
  padding: 0 3em 3em 3em;
}
.no-post {
  font-size: 30px;
  font-style: italic;
  margin-top: 50px;
  border-top: 1px solid white;
  padding-top: 30px;
  color: white;
}
.catalog-heading {
  color: white;
  text-align: center;
  font-size: xx-large;
}
.loader {
  position: absolute;
  z-index: 55;
  margin-left: 50%;
  margin-top: 120px;
}
</style>
