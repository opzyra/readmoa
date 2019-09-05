import { NavigationGuard } from "vue-router";
import store from "@/store";

export const platform: NavigationGuard = (to, from, next) => {
  const platforms = store.state.platforms;
  if (!platforms.includes(to.params.platform)) {
    next("error");
  }

  next();
};
