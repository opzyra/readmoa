<template>
  <fragment>
    <MainContainer />
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainContainer from "@/containers/MainContainer.vue";

@Component({
  components: {
    MainContainer
  }
})
export default class Main extends Vue {}
</script>
