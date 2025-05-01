<template>
  <main class="home container">
    <section class="welcome">
      <h1>Welcome to Food World</h1>
      <h2>
        Welcome to Foodie Haven, your ultimate destination for all things
        delicious! Whether you're a seasoned chef or a culinary novice, we're
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
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
}

.welcome {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.233);
  border-radius: 20px;
  padding: 2rem;
  color: aliceblue;
  backdrop-filter: blur(5px);
}

.welcome h1 {
  font-style: italic;
  font-size: 3rem;
  color: aliceblue;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome h2 {
  font-style: italic;
  font-size: 1.5rem;
  color: aliceblue;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 1.5rem;
  line-height: 1.6;
}

.last-added {
  flex: 0.8;
  background-color: rgba(255, 255, 255, 0.333);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
}

.last-added h4 {
  color: white;
  text-align: center;
  margin-top: 0;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.loader {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

/* Responsive styles */
@media screen and (max-width: 1200px) {
  .welcome h1 {
    font-size: 2.5rem;
  }

  .welcome h2 {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 992px) {
  .home {
    flex-direction: column;
    gap: 1.5rem;
  }

  .welcome,
  .last-added {
    width: 100%;
    margin: 0;
  }

  .welcome h1 {
    font-size: 2.2rem;
  }

  .welcome h2 {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media screen and (max-width: 576px) {
  .home {
    padding: 1rem 0.5rem;
  }

  .welcome h1 {
    font-size: 1.8rem;
  }

  .welcome h2 {
    font-size: 1rem;
    padding: 0.8rem;
  }

  .last-added h4 {
    font-size: 1.5rem;
  }
}
</style>
