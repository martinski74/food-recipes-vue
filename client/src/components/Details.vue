<template>
  <VueSpinnerOval
    class="loader"
    v-if="recipeStore.isLoading"
    size="100"
    color="#bb86fc"
  />

  <div v-if="!recipeStore.isLoading" class="content">
    <article class="recipe-detail">
      <img :src="recipeStore.recipe?.image" alt="Spaghetti Carbonara" />

      <h2>{{ recipeStore.recipe?.title }}</h2>
      <p>{{ recipeStore.recipe?.description }}</p>
      <h3>-----------------------------------------------------</h3>
      <h3>Ingredients:</h3>
      <p>{{ recipeStore.recipe?.ingredients }}</p>

      <h3>-----------------------------------------------------</h3>

      <h3>Instructions:</h3>
      <p>{{ recipeStore.recipe?.instructions }}</p>

      <p>Created at: {{ recipeStore.recipe?.createdAt?.slice(0, 10) }}</p>
      <h3>-----------------------------------------------------</h3>

      <h3>
        Нumber of recommendations:
        {{ recipeStore.recipe?.recommendList?.length }}
      </h3>
      <div class="command">
        <template v-if="userStore.isLoggedIn && isAuthor">
          <RouterLink :to="'/edit/' + $route.params.id">Edit</RouterLink>
          <RouterLink :to="'/delete/' + $route.params.id">Delete</RouterLink>
        </template>

        <p v-if="isRecommended">You've already recommended this recipe!</p>

        <span
          v-else-if="userStore.isLoggedIn && !isRecommended && !isAuthor"
          @click="recommendRecipe"
        >
          Recommend</span
        >
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { useRecipeStore } from "@/stores/recipes.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const recipeStore = useRecipeStore();
const route = useRoute();
const isAuthor = ref(false);
const isRecommended = ref(false);

const recommendRecipe = async () => {
  try {
    const recipeId = route.params.id;
    const updatedRecipe = {
      ...recipeStore.recipe,
      recommendList: [...recipeStore.recipe.recommendList, userStore.user._id],
    };
    const res = await recipeStore.updateRecipe(recipeId, updatedRecipe);

    if (res.status === 200) {
      isRecommended.value = true;
      // await recipeStore.getRecipeById(recipeId);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const recipeId = route.params.id;
  await recipeStore.getRecipeById(recipeId);
  isAuthor.value = recipeStore.recipe?.owner === userStore.user?._id;
  isRecommended.value = recipeStore.recipe?.recommendList?.includes(
    userStore.user?._id
  );
});
</script>
<style lang="css" scoped>
.content {
  padding-bottom: 3em;
}

.recipe-detail {
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 800px;
  margin: 2em auto 0 auto;
  text-align: center;
}

.recipe-detail:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-detail img {
  width: 45%;
  border-radius: 8px;
  margin-bottom: 1em;
  transition: transform 0.3s;
  float: left;
  margin-right: 20px;
}

.recipe-detail:hover img {
  transform: scale(1.05);
}

.recipe-detail h2 {
  background-color: #5b1f51;
  color: white;
  padding: 0.5em;
  border-radius: 4px;
  font-size: 1.5em;
  margin-bottom: 1em;
  display: inline-block;
  max-width: 300px;
}

.recipe-detail h3 {
  color: #2c3e50;
  margin-top: 1em;
  font-size: 1.2em;
  font-weight: 700;
}

.recipe-detail ul,
.recipe-detail ol {
  text-align: left;
  margin: 1em 0;
  padding: 0 1em;
  color: #555;
}

.recipe-detail ul li,
.recipe-detail ol li {
  margin-bottom: 0.5em;
}

.command {
  display: flex;
  justify-content: center;
  align-items: center;
}

.command a {
  background-color: #db34a2;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.3s, transform 0.3s;
  font-weight: 700;
  margin-bottom: 15px;
  margin-left: 20px;
}
.command span {
  background-color: #db34a2;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.3s, transform 0.3s;
  font-weight: 700;
  margin-bottom: 15px;
  margin-left: 20px;
}

.command span:hover {
  background-color: #b1177d;
  transform: scale(1.05);
  cursor: pointer;
}

.command a:hover {
  background-color: #b1177d;
  transform: scale(1.05);
}

.command p {
  background-color: #db34a2;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.3s, transform 0.3s;
  font-weight: 700;
  margin-top: 1em;
  margin-left: 20px;
}
.loader-details {
  position: absolute;
  z-index: 55;
  margin-left: 50%;
  margin-top: 150px;
}
.loader {
  position: absolute;
  z-index: 55;
  margin-left: 50%;
  margin-top: 150px;
}
</style>
