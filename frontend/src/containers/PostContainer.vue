<template>
  <PostContainerBlock>
    <PostList />
  </PostContainerBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import PostList from "@/components/post/PostList.vue";

const PostContainerBlock = styled.main`
  margin-left: 112px;
  padding: 28px;
`;

@Component({
  components: {
    PostContainerBlock,
    PostList
  }
})
export default class PostContainer extends Vue {}
</script>
