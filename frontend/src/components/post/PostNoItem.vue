<template>
  <PostNoItemBlock>
    <div>
      <img src="@/assets/images/error_bot.png" alt="error" />
      <h3>
        등록된 포스트가 존재하지 않거나
        <br />서버와 통신에 실패하였습니다
      </h3>
    </div>
  </PostNoItemBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

const PostNoItemBlock = styled.div`
  height: 100vh;
  width: 100%;
  margin: -28px 0px;

  div {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    width: 360px;
  }

  h3 {
    font-size: 20px;
    margin-top: 12px;
    font-weight: bold;
    line-height: 32px;
  }
`;

@Component({
  components: {
    PostNoItemBlock
  }
})
export default class PostNoItem extends Vue {}
</script>
