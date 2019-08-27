import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const enum Mutations {
  INCREMENT = "increment"
}

export interface IStore {
  platforms: Array<string>;
}

export default new Vuex.Store<IStore>({
  state: {
    platforms: ["okky", "velog", "branch"]
  },
  mutations: {},
  actions: {}
});
