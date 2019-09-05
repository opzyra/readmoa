import "reflect-metadata";
import "babel-polyfill";
import "es6-promise/auto";

import Vue from "vue";
import Fragment from "vue-fragment";
import VueAnalytics from "vue-analytics";
import { loadProgressBar } from "axios-progress-bar";

import "axios-progress-bar/dist/nprogress.css";
import "@/assets/css/global.css";

import router from "./routes";
import store from "./store";
import App from "./App.vue";

Vue.use(Fragment.Plugin);
Vue.use(VueAnalytics, {
  id: "UA-147153234-1",
  router,
  debug: {
    sendHitTask: true
  }
});

Vue.config.productionTip = false;

loadProgressBar();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
