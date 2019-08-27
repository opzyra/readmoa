<template>
  <PostListBlock>
    <PostItem v-for="(item, idx) in posts" :key="idx" :item="item" />
  </PostListBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import PostItem from "./PosItem.vue";

const PostListBlock = styled.ul`
  position: relative;
  font-size: 0;
`;

@Component({
  components: {
    PostListBlock,
    PostItem
  }
})
export default class PostList extends Vue {
  @Prop()
  posts!: Array<Object>;
}
</script>
