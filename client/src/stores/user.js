import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const getUserData = computed(() => (user.value ? user.value : null));

  const register = async (input) => {
    try {
      const response = await axios.post('/api/users/register', input, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // user.value = response.data;
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = async (input) => {
    try {
      const response = await axios.post('/api/users/login', {
        email: input.email,
        password: input.password,
      });
      user.value = response.data;

      localStorage.setItem('user', JSON.stringify(user.value));
      $toast.open({
        message: 'Successfully logged in!',
        type: 'success',
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
    } catch (error) {
      $toast.open({
        message: `${error.response.data.message}`.toString(),
        type: 'error',
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });

      console.error('Error logging in:', error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      user.value = null;
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { register, login, logout, user, isLoggedIn, getUserData };
});
