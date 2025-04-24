<template>
  <div class="item">
    <img class="image" :src="item.image" />
    <p>{{ item.title }}</p>

    <RouterLink class="details-btn" :to="`/details/${item._id}`">
      Details
    </RouterLink>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.item {
  display: inline-block;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 30px;
  transition: transform 0.2s ease-in-out;
}
.item:hover {
  transform: scale(1.01);
}

.image {
  float: left;
  border: 2px solid rgba(169, 152, 198, 0.781);
  border-radius: 50%;
  width: 110px;
  height: 110px;
  margin: 10px;
}

.details-btn {
  cursor: pointer;
  outline: none;
  font-size: 16px;
  background-image: linear-gradient(45deg, #124e78, #e8b77e);
  padding: 0.7em 2em;
  border-radius: 65px;
  border: 5em;
  box-shadow: 1px 1px 10px rgba(255, 255, 255, 0.438);
  color: white;
  width: 100px;
  margin-bottom: 10px;
  margin-left: 20px;
  text-decoration: none;
}

main .last-added div p {
  text-align: left;
  font-weight: bold;
  font-size: x-large;
}
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
