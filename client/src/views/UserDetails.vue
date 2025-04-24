<template>
  <div class="user-info">
    <h1>User Details</h1>
    <img class="profileImage" :src="userImage" alt="user" />

    <div>User ID: {{ userId }}</div>
    <div>User name: {{ userStore.user?.username }}</div>
    <div>User email: {{ userStore.user?.email }}</div>
    <div>Last activity: {{ new Date().toLocaleString() }}</div>
    <div>
      {{ userStore.user?.username }}'s published recipes:{{ myRecipes?.length }}
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import avatar from "../assets/user.png";
import { useRecipeStore } from "../stores/recipes";

const userStore = useUserStore();
const recipeStore = useRecipeStore();
const route = useRoute();
const userId = route.params.id;

const myRecipes = ref([]);
const userImage = computed(() => {
  return userStore.user?.img ? `/api/${userStore.user.img}` : avatar;
});

onMounted(() => {
  console.log(userStore.user.img);

  recipeStore.recipes.map((recipe) => {
    if (recipe.owner === userId) {
      myRecipes.value.push(recipe);
    }
  });
});
</script>

<style scoped>
.user-info {
  color: aliceblue;
  background: rgb(0, 0, 0, 0.6);
  width: 50%;
  margin: 2em auto;
  padding: 3em;
  border-radius: 15px;
  -webkit-box-shadow: 9px 10px 43px 4px rgba(143, 127, 143, 0.53);
  -moz-box-shadow: 9px 10px 43px 4px rgba(143, 127, 143, 0.53);
  box-shadow: 9px 10px 43px 4px rgba(143, 127, 143, 0.53);
}
.user-info h1 {
  text-align: center;
}
.user-info div {
  font-size: 28px;
  font-weight: 600;
  line-height: 2em;
}

.profileImage {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: auto;
  display: block;
  object-fit: cover;
}
</style>
