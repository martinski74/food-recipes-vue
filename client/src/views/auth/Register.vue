<template>
  <main class="register">
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form
          class="login-form"
          @submit.prevent="handleSubmit"
          enctype="multipart/form-data"
        >
          <input
            :style="errors.username ? { border: '2px solid red' } : {}"
            type="text"
            name="username"
            placeholder="username *"
            v-model="input.username"
          />
          <p v-if="errors.username" class="error">
            {{ errors.username }}
          </p>

          <input
            :style="errors.email ? { border: '2px solid red' } : {}"
            type="email"
            name="email"
            placeholder="email *"
            v-model="input.email"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>

          <input
            :style="errors.password ? { border: '2px solid red' } : {}"
            type="password"
            name="password"
            placeholder="password *"
            autocomplete="on"
            v-model="input.password"
          />
          <p v-if="errors.password" class="error">
            {{ errors.password }}
          </p>

          <input
            :style="errors.repass ? { border: '2px solid red' } : {}"
            type="password"
            name="repass"
            placeholder="repeat password"
            autocomplete="on"
            v-model="input.repass"
          />
          <p v-if="errors.repass" class="error">{{ errors.repass }}</p>

          <label for="userImage">Upload profile image (optional)</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            @change="(e) => handleUpload(e)"
          />

          <button type="submit">Register</button>
          <p class="message">
            Already registered? <router-link to="/login">Login</router-link>
          </p>
        </form>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const router = useRouter();
const userStore = useUserStore();
const $toast = useToast();

const input = ref({
  username: "",
  email: "",
  password: "",
  repass: "",
  userImage: null,
});

const errors = ref({
  username: null,
  email: null,
  password: null,
  repass: null,
});

const validateForm = () => {
  const newErrors = {};

  if (!input.value.username) {
    newErrors.username = "Username is required";
  }

  if (!input.value.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.value.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!input.value.password) {
    newErrors.password = "Password is required";
  } else if (input.value.password.length < 3) {
    newErrors.password = "Password must be at least 3 characters";
  }

  if (!input.value.repass) {
    newErrors.repass = "Repeat password is required";
  } else if (input.value.repass !== input.value.password) {
    newErrors.repass = "Passwords do not match";
  }

  errors.value = newErrors;

  return Object.keys(newErrors).length === 0;
};
const handleUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    input.value.userImage = file;
    // input.value.userImage = file;
  }
};

const handleSubmit = async () => {
  const isValid = validateForm();
  if (!isValid) {
    $toast.open({
      message: "Please fill in all fields correctly.",
      type: "error",
      duration: 2000,
      position: "top-right",
      dismissible: true,
    });
    return;
  }
  try {
    const formData = new FormData();
    formData.append("username", input.value.username);
    formData.append("email", input.value.email);
    formData.append("password", input.value.password);
    if (input.value.userImage) {
      formData.append("img", input.value.userImage);
    }

    const res = await userStore.register(formData);
    $toast.open({
      message: "Successfully registered!",
      type: "success",
      position: "top-right",
      duration: 2000,
      dismissible: true,
    });

    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="css" scoped>
.register {
  margin-top: 5%;
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
.form input {
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
.message {
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
.form label {
  cursor: pointer;
  color: aliceblue;
  font-size: 15px;
}
</style>
