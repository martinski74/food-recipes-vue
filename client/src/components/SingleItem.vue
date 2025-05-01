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
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 30px;
  transition: transform 0.2s ease-in-out;
  padding: 10px;
  gap: 15px;
}

.item:hover {
  transform: scale(1.01);
}

.image {
  border: 2px solid rgba(169, 152, 198, 0.781);
  border-radius: 50%;
  width: 110px;
  height: 110px;
  object-fit: cover;
  flex-shrink: 0;
}

.details-btn {
  cursor: pointer;
  outline: none;
  font-size: 16px;
  background-image: linear-gradient(45deg, #124e78, #e8b77e);
  padding: 0.7em 2em;
  border-radius: 65px;
  border: none;
  box-shadow: 1px 1px 10px rgba(255, 255, 255, 0.438);
  color: white;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
}

.details-btn:hover {
  transform: scale(1.05);
}

p {
  flex: 1;
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .item {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .image {
    width: 90px;
    height: 90px;
  }

  p {
    font-size: 1.1rem;
    margin: 10px 0;
  }

  .details-btn {
    width: 80%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 576px) {
  .item {
    padding: 10px;
  }

  .image {
    width: 80px;
    height: 80px;
  }

  p {
    font-size: 1rem;
  }

  .details-btn {
    width: 90%;
    font-size: 14px;
    padding: 0.5em 1.5em;
  }
}
</style>
