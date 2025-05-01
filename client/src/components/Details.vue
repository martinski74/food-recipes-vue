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
  overflow: hidden;
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
  object-fit: cover;
  height: 300px;
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

.recipe-detail p {
  text-align: left;
  line-height: 1.6;
  color: #555;
  margin: 1em 0;
}

.command {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.command a,
.command span,
.command p {
  background-color: #db34a2;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.3s, transform 0.3s;
  font-weight: 700;
  margin: 0;
}

.command span:hover,
.command a:hover {
  background-color: #b1177d;
  transform: scale(1.05);
  cursor: pointer;
}

.loader {
  position: absolute;
  z-index: 55;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* Responsive styles */
@media screen and (max-width: 992px) {
  .recipe-detail {
    margin: 1em;
    padding: 1.5em;
  }

  .recipe-detail img {
    width: 100%;
    float: none;
    margin-right: 0;
    height: 250px;
  }

  .recipe-detail h2 {
    font-size: 1.3em;
    max-width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .recipe-detail {
    margin: 0.5em;
    padding: 1em;
  }

  .recipe-detail img {
    height: 200px;
  }

  .recipe-detail h2 {
    font-size: 1.2em;
  }

  .recipe-detail h3 {
    font-size: 1.1em;
  }

  .recipe-detail p {
    font-size: 0.9em;
  }

  .command {
    flex-direction: column;
  }

  .command a,
  .command span,
  .command p {
    width: 100%;
    text-align: center;
  }
}
</style>
