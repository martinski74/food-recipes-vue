<template>
  <main class="home">
    <section class="welcome">
      <h1>Welcome to Food World</h1>
      <h2>
        Welcome to Foodie Haven, your ultimate destination for all things
        delicious! Whether you’re a seasoned chef or a culinary novice, we’re
        here to inspire and guide you through a world of flavors, recipes, and
        food adventures.
      </h2>
    </section>

    <section class="last-added">
      <h4>Last Added</h4>
      <VueSpinnerOval
        class="loader"
        v-if="recipeStore.isLoading"
        size="100"
        color="#bb86fc"
      />
      <RecentList />

      <!-- <p class="no-post">There are no recipes!</p> -->
    </section>
  </main>
</template>
<script setup>
import RecentList from "../components/RecentList.vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();
</script>
<style scoped>
.home {
  display: flex;
  justify-content: space-around;
}

.welcome {
  width: 35%;
  margin-left: 100px;
  margin-top: 60px;
  background-color: rgba(255, 255, 255, 0.233);
  border-radius: 20px;
  padding: 10px;
  color: aliceblue;
}

.welcome h1 {
  font-style: italic;
  font-size: 50px;
  color: aliceblue;
  text-align: center;
  margin-top: 50px;
}

.welcome h2 {
  font-style: italic;
  font-size: 27px;
  color: aliceblue;
  text-align: center;
  background: rgb(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
}

main .last-added {
  background-color: rgba(255, 255, 255, 0.333);
  width: 25%;
  margin-top: 60px;
  border-radius: 20px;
  padding: 10px;
}

.last-added h4 {
  color: white;
  text-align: center;
  margin-top: 0;
  font-size: x-large;
}
.loader {
  margin-left: 35%;
}
</style>
