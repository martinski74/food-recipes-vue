<template>
  <main class="login">
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form class="login" @submit.prevent="handleSubmit">
          <input
            :style="errors.email ? { border: '2px solid red' } : {}"
            type="text"
            name="email"
            placeholder="email"
            v-model="input.email"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
          <input
            :style="errors.password ? { border: '2px solid red' } : {}"
            type="password"
            name="password"
            placeholder="password"
            autocomplete="on"
            v-model="input.password"
          />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
          <button type="submit">Login</button>
          <p class="message">
            Not registered?
            <router-link to="/register">Create an account</router-link>
          </p>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue';

import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const input = ref({
  email: '',
  password: '',
});
const errors = ref({
  email: '',
  password: '',
});

const validateForm = () => {
  const newErrors = {};

  if (!input.value.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(input.value.email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!input.value.password) {
    newErrors.password = 'Password is required';
  } else if (input.value.password.length < 3) {
    newErrors.password = 'Password must be at least 3 characters';
  }

  errors.value = newErrors;

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  const isValid = validateForm();
  if (!isValid) {
    $toast.open({
      message: 'Please fill in all fields correctly.',
      type: 'error',
      duration: 2000,
      position: 'top-right',
      dismissible: true,
    });
    return;
  }
  try {
    const res = await userStore.login(input.value);

    router.push('/catalog');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="css">
.login {
  margin-top: 10%;
}

.form {
  background: #5b1f51;
  max-width: 460px;
  margin: auto;
  margin-top: 10px;
  padding: 45px;
  text-align: center;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.682), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form h2 {
  margin-top: 0px;
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
}

.form input,
textarea {
  outline: 0;
  background: #f2f2f2;
  width: 90%;
  height: 50px;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.form button {
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  background: white;
  width: 50%;
  border: 0;
  padding: 15px;
  color: black;
  font-size: 14px;
  border-radius: 10px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #e192e1;
}

.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: '';
  display: block;
  clear: both;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 17px;
}
.form .message a {
  color: white;
  text-decoration: none;
}
.form .error {
  color: #ff0000;
  font-size: 16px;
  /* background-color: #e0c4c4; */
  margin-top: -5px;
  margin-bottom: 5px;
}
</style>
