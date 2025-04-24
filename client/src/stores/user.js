import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const getUserData = computed(() => (user.value ? user.value : null));

  const register = async (input) => {
    try {
      const response = await axios.post("/api/users/register", input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // user.value = response.data;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (input) => {
    try {
      const response = await axios.post("/api/users/login", {
        email: input.email,
        password: input.password,
      });
      user.value = response.data;

      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      user.value = null;
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { register, login, logout, user, isLoggedIn, getUserData };
});
