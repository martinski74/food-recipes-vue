<template>
  <main class="create">
    <section id="create">
      <div class="form">
        <h2>Delete Recipe</h2>
        <form class="create-form" @submit.prevent="handleSubmit">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            v-model="input.title"
            disabled
          />

          <textarea
            name="description"
            placeholder="Description"
            v-model="input.description"
            disabled
          ></textarea>

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            v-model="input.ingredients"
            disabled
          ></textarea>

          <textarea
            name="instructions"
            placeholder="Instructions"
            v-model="input.instructions"
            disabled
          ></textarea>

          <input
            type="url"
            name="image"
            placeholder="Image url"
            v-model="input.image"
            disabled
          />

          <button type="submit">Delete Recipe</button>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipeStore } from "@/stores/recipes.js";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const recipeStore = useRecipeStore();
const route = useRoute();
const router = useRouter();
const $toast = useToast();

const input = ref({
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  image: "",
});

const handleSubmit = async () => {
  const recipeId = route.params.id;

  const res = await recipeStore.deleteRecipe(recipeId);
  $toast.open({
    message: "Recipe deleted successfully",
    type: "success",
    duration: 2000,
    position: "top-right",
    dismissible: true,
  });
  router.push("/catalog");
};

onMounted(async () => {
  const recipeId = route.params.id;
  await recipeStore.getRecipeById(recipeId);
  input.value = { ...recipeStore.recipe };
});
</script>

<style lang="css" scoped>
.create {
  margin-top: 5%;
}
.form {
  background: #5b1f51;
  max-width: 460px;
  margin: auto;
  margin-top: 10px;
  padding: 45px;
  text-align: center;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.682), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form h2 {
  margin-top: 0px;
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
}

.form input,
textarea {
  outline: 0;
  background: #f2f2f2;
  width: 90%;
  height: 50px;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.form button {
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  background: white;
  width: 50%;
  border: 0;
  padding: 15px;
  color: black;
  font-size: 14px;
  border-radius: 10px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #e192e1;
}

.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
</style>
