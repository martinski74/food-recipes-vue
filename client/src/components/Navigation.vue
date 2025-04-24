<template>
  <header class="header">
    <nav>
      <img
        width="90"
        src="https://cdn.freebiesupply.com/logos/large/2x/my-recipes-logo-png-transparent.png"
        alt="logo"
      />

      <RouterLink exact-active-class="active" to="/">Home</RouterLink>
      <RouterLink exact-active-class="active" to="/catalog"
        >Recipe Catalog</RouterLink
      >
      <RouterLink exact-active-class="active" to="/search">Search</RouterLink>

      <!-- Logged-in users -->

      <RouterLink
        v-if="userStore.isLoggedIn"
        exact-active-class="active"
        to="/create"
        >Add Recipe</RouterLink
      >
      <RouterLink v-if="userStore.isLoggedIn" to="/">
        <span @click="onLogout">Logout</span>
      </RouterLink>

      <RouterLink
        v-if="userStore.isLoggedIn"
        exact-active-class="active"
        :to="`/user/${userStore.user?._id}`"
        >Welcome, {{ userStore.user?.username }}
      </RouterLink>

      <!-- Guest users -->

      <RouterLink
        v-if="!userStore.isLoggedIn"
        exact-active-class="active"
        to="/login"
        >Login</RouterLink
      >
      <RouterLink
        v-if="!userStore.isLoggedIn"
        exact-active-class="active"
        to="/register"
        >Register</RouterLink
      >
    </nav>
  </header>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const onLogout = () => {
  userStore.logout();
};
</script>
<style scoped>
.header {
  /* display: flex;
    justify-content: space-between; */
  align-items: center;
  padding: 1em;
  background: #5b1f51;
}

nav {
  display: flex;
  justify-content: space-around;
}

nav a,
span {
  font-size: 1.6rem;
  color: #0a0a0a;
  font-weight: 400;
}
.active {
  border-radius: 10px;
  color: #fff9f9;
  background: #b25ab3;
}

.header a,
span {
  padding: 5px 15px;
  text-decoration: none;
  color: aliceblue;
  font-family: cursive;
}

.header a:hover,
.header span:hover {
  color: rgb(202, 203, 204);
  cursor: pointer;
}
</style>
