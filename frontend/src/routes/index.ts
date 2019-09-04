import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Posts from "@/views/Posts.vue";

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
      component: Posts
    }
  ]
});
