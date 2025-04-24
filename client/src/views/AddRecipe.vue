<template>
  <main class="create">
    <section id="create">
      <div class="form">
        <h2>Add Recipe</h2>
        <form class="create-form" @submit.prevent="handleSubmit">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            v-model="input.title"
          />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>

          <textarea
            name="description"
            placeholder="Description"
            v-model="input.description"
          ></textarea>
          <p v-if="errors.description" class="error">
            {{ errors.description }}
          </p>

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            v-model="input.ingredients"
          ></textarea>
          <p v-if="errors.ingredients" class="error">
            {{ errors.ingredients }}
          </p>

          <textarea
            name="instructions"
            placeholder="Instructions"
            v-model="input.instructions"
          ></textarea>
          <p v-if="errors.instructions" class="error">
            {{ errors.instructions }}
          </p>

          <input
            type="url"
            name="image"
            placeholder="Image url"
            v-model="input.image"
          />
          <p v-if="errors.image" class="error">{{ errors.image }}</p>

          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@/stores/recipes.js";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const recipeStore = useRecipeStore();
const userStore = useUserStore();
const router = useRouter();
const $toast = useToast();

const input = ref({
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  image: "",
});
const errors = ref({
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  image: "",
});

const handleSubmit = async () => {
  const { title, description, ingredients, instructions, image } = input.value;
  // Validate input fields
  errors.value.title = title ? "" : "Title is required";
  errors.value.description = description ? "" : "Description is required";
  errors.value.ingredients = ingredients ? "" : "Ingredients are required";
  errors.value.instructions = instructions ? "" : "Instructions are required";
  errors.value.image = image ? "" : "Image URL is required";

  if (
    errors.value.title ||
    errors.value.description ||
    errors.value.ingredients ||
    errors.value.instructions ||
    errors.value.image
  ) {
    $toast.open({
      message: "Please fill in all fields.",
      type: "error",
      duration: 2000,
      position: "top-right",
      dismissible: true,
    });
    return;
  }

  let payload = {
    ...input.value,
    recommendList: [],
    owner: userStore.user._id,
    // createdAt: new Date().toISOString(),
  };

  await recipeStore.createRecipe(payload);
  $toast.open({
    message: "Recipe created successfully!",
    type: "success",
    position: "top-right",
    duration: 2000,
    dismissible: true,
  });

  router.push("/catalog");
};
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

.create-form input,
.create-form textarea {
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

.form .error {
  color: red;
  margin: -7px 10px 8px 10px;
  font-size: 16px;
}
</style>
