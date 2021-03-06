declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-styled-components" {
  const x: any;
  export = x;
}

declare module "vue-fragment" {
  const x: any;
  export = x;
}

declare module "vue-analytics" {
  const x: any;
  export = x;
}

declare module "axios-progress-bar" {
  export function loadProgressBar(): void;
}
