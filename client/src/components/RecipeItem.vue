<template>
  <article class="recipe">
    <img :src="recipe.image" alt="Recipe Image" />
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
    <router-link :to="`/details/${recipe._id}`">Read More</router-link>
  </article>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.recipe {
  background: white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 350px;
  margin: 1rem auto;
}

.recipe:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1em;
  transition: transform 0.3s;
}

.recipe:hover img {
  transform: scale(1.05);
}

.recipe h3 {
  background-color: #5b1f51;
  color: white;
  padding: 0.5em;
  border-radius: 4px;
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.recipe p {
  margin: 1em 0;
  color: #555;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe a {
  background-color: #3498db;
  color: white;
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.3s, transform 0.3s;
  font-weight: 700;
  margin-top: 1em;
}

.recipe a:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .recipe {
    max-width: 300px;
  }

  .recipe img {
    height: 180px;
  }

  .recipe h3 {
    font-size: 1.1em;
  }
}

@media screen and (max-width: 576px) {
  .recipe {
    max-width: 100%;
    margin: 0.5rem 0;
  }

  .recipe img {
    height: 160px;
  }

  .recipe h3 {
    font-size: 1em;
  }

  .recipe p {
    height: 50px;
    font-size: 0.9em;
  }
}
</style>
