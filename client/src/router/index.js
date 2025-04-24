import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("../views/CatalogView.vue"),
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../components/Details.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/Search.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/AddRecipe.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/EditRecipe.vue"),
    },
    {
      path: "/delete/:id",
      name: "delete",
      component: () => import("../views/DeleteRecipe.vue"),
    },
    {
      path: "/user/:id",
      name: "user",
      component: () => import("../views/UserDetails.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      // name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
