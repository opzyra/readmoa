<template>
  <PostContainerBlock>
    <PostList :posts="posts" />
    <PostNoItem v-if="isNoItem" />
  </PostContainerBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";
import _ from "lodash";

import device from "@/lib/device";

import browser from "../lib/browser";
import postsApi from "../lib/api/posts";

import PostList from "@/components/post/PostList.vue";
import PostNoItem from "@/components/post/PostNoItem.vue";

const PostContainerBlock = styled.main`
  margin-left: 112px;
  padding: 28px;

  @media ${device.mobile} {
    margin: 108px 0 0 0;
    padding: 0 8px;
  }
`;

@Component({
  components: {
    PostContainerBlock,
    PostList,
    PostNoItem
  }
})
export default class PostContainer extends Vue {
  platform!: string;
  posts: Array<Object> = [];
  isNext: boolean = true;
  isNoItem: boolean = false;
  skip: number = 0;
  scroll: any = _.debounce(() => {
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
    this.featchPosts().finally(() => {
      if (this.posts.length == 0) this.isNoItem = true;
    });

    window.addEventListener("scroll", this.scroll);
  }

  destroyed() {
    window.removeEventListener("scroll", this.scroll);
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
