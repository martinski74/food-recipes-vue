import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueSpinnersPlugin } from "vue3-spinners";
import { ToastPlugin } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import App from "./App.vue";
import router from "./router";
import "./main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSpinnersPlugin);
app.use(ToastPlugin);

app.mount("#app");
