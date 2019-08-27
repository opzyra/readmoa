<template>
  <PostContainerBlock ref="ctx">
    <PostList :posts="posts" />
  </PostContainerBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";
import _ from "lodash";

import browser from "../lib/browser";
import postsApi from "../lib/api/posts";

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
export default class PostContainer extends Vue {
  platform!: string;
  posts: Array<Object> = [];
  isNext: boolean = true;
  skip: number = 0;
  scrollFnc: any = _.debounce(() => {
    const scrollTop = browser.getScrollTop();
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const percentage = ((scrollTop + innerHeight) / scrollHeight) * 100;
    if (percentage > 80) {
      this.featchPosts();
    }
  }, 100);

  async created() {
    const { platform } = this.$route.params;
    this.platform = platform;
    this.featchPosts();

    window.addEventListener("scroll", this.scrollFnc);
  }

  destoryed() {
    window.removeEventListener("scroll", this.scrollFnc);
  }

  async featchPosts() {
    if (!this.isNext) return;
    const { data } = await postsApi.getPosts(this.platform, this.skip);
    this.posts.push(...data.posts);
    this.skip = data.skip;
    this.isNext = data.isNext;
  }
}
</script>
