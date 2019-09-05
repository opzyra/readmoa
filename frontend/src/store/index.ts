import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface IStore {
  platforms: Array<string>;
}

export default new Vuex.Store<IStore>({
  state: {
    platforms: ["okky", "velog", "brunch", "tistory", "medium", "github"]
  },
  mutations: {},
  actions: {}
});
