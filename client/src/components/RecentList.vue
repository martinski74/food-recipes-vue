<template>
  <section class="last">
    <div class="items">
      <SingleItem
        v-for="item in recipeStore.recent"
        :key="item._id"
        :item="item"
      />
      <p v-if="recipeStore.recent.length === 0" class="no-post">
        There are no recipes!
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SingleItem from "./SingleItem.vue";
import { useRecipeStore } from "../stores/recipes.js";

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.getRecentRecipes();
});
</script>

<style scoped>
.no-post {
  background-color: #b25ab3;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
  margin-top: 50%;
}
.last div p {
  /* text-align: left; */
  font-weight: bold;
}
</style>
