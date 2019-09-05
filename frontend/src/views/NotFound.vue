<template>
  <fragment>
    <ErrorContainer />
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorContainer from "@/containers/ErrorContainer.vue";

@Component({
  components: {
    ErrorContainer
  }
})
export default class NotFound extends Vue {}
</script>
