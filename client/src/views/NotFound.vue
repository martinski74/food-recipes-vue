<template>
  <section class="error-page">
    <h2>404!</h2>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <RouterLink to="/" class="btn"> Go Back Home </RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 4em 1em;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 8em auto;
  background-image: url("https://t3.ftcdn.net/jpg/03/15/56/22/360_F_315562279_OHnbVLC4FrsoNhnM89lVhLTQrV5u9qoN.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(4px);
}

h2 {
  font-size: 6em;
  color: #2c3e50;
  margin-bottom: 0.5em;
  font-weight: 700;
}

p {
  font-size: 1.5em;
  margin-bottom: 1.5em;
}

.btn {
  background-color: #3498db;
  color: white;
  padding: 0.75em 1.5em;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
  transition: background 0.3s, transform 0.3s;
}

.btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}
</style>
