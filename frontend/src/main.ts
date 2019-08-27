import "reflect-metadata";
import "babel-polyfill";
import "es6-promise/auto";

import Vue from "vue";
import Fragment from "vue-fragment";

import "@/assets/css/reset.css";
import "@/assets/css/global.css";

import router from "./routes";
import store from "./store";
import App from "./App.vue";

Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
