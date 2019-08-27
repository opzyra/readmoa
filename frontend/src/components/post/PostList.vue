<template>
  <PostListBlock>
    <PostItem v-for="(item, idx) in posts" :key="idx" :item="item" />
  </PostListBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import { getPosts } from "../../lib/api/posts";

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
  posts: Array<Object> = [];

  async created() {
    const { platform } = this.$route.params;
    const { data } = await getPosts(platform, 0);
    this.posts = data;
  }
}
</script>
