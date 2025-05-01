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
  margin-top: 5%;
  padding: 0 1rem;
}

.form {
  background: #5b1f51;
  max-width: 460px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.682), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: white;
}

.form input,
textarea {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
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
  transition: all 0.3s ease;
}

.form input:focus {
  background: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
  transition: all 0.3s ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #e192e1;
  transform: scale(1.05);
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 17px;
}

.form .message a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form .message a:hover {
  color: #e192e1;
}

.form .error {
  color: #ff0000;
  font-size: 16px;
  margin-top: -5px;
  margin-bottom: 5px;
}

/* Responsive styles */
@media screen and (max-width: 576px) {
  .login {
    margin-top: 2rem;
  }

  .form {
    padding: 1.5rem;
  }

  .form h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .form input,
  textarea {
    height: 45px;
    font-size: 13px;
    padding: 12px;
  }

  .form button {
    width: 70%;
    padding: 12px;
    font-size: 13px;
  }

  .form .message {
    font-size: 15px;
  }

  .form .error {
    font-size: 14px;
  }
}

@media screen and (max-width: 360px) {
  .form {
    padding: 1rem;
  }

  .form h2 {
    font-size: 1.3rem;
  }

  .form input,
  textarea {
    height: 40px;
    font-size: 12px;
    padding: 10px;
  }

  .form button {
    width: 80%;
    padding: 10px;
    font-size: 12px;
  }
}
</style>
