import Vue from "vue";
import Router from "vue-router";
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
      redirect: "/posts/okky"
    },
    {
      path: "/posts/:platform",
      name: "post",
      component: Posts
    }
  ]
});
