import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Posts from "@/views/Posts.vue";
import NotFound from "@/views/NotFound.vue";

import { platform } from "./guards";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "",
  linkExactActiveClass: "on",
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/posts/:platform",
      name: "post",
      beforeEnter: platform,
      component: Posts
    },
    {
      path: "*",
      name: "error",
      component: NotFound
    }
  ]
});
