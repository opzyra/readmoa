<template>
  <fragment>
    <MenuContainer />
    <PostContainer />
  </fragment>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuContainer from "@/containers/MenuContainer.vue";
import PostContainer from "@/containers/PostContainer.vue";

@Component({
  components: {
    MenuContainer,
    PostContainer
  }
})
export default class Posts extends Vue {}
</script>