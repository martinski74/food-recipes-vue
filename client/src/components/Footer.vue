<template>
  <footer class="footer">
    <span
      >All rights reserved! &copy; {{ new Date().getFullYear() }}&nbsp;</span
    >
    <span>Recipes by Martin Dobrudzhanski</span>
  </footer>
</template>
<script setup></script>
<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #5b1f51;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: larger;
}
</style>
