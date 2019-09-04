<template>
  <MainContainerBlock>
    <div>
      <img src="@/assets/images/logo_typo_color.png" />
      <h1>
        커뮤니티, 플랫폼, 블로그
        <br />개발자들의 다양한 이야기를
        <br />한곳에서 모아 보자!
      </h1>
      <router-link tag="button" to="/posts/okky">시작하기</router-link>
    </div>
  </MainContainerBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

const MainContainerBlock = styled.main`
  height: 100vh;
  width: 100%;
  background: url(${require("@/assets/images/cover.png")}) no-repeat;
  background-size: cover;
  position: relative;

  div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 150px;
  }

  div img {
    width: 70%;
    margin-bottom: 12px;
  }

  div h1 {
    font-size: 28px;
    margin-left: 4px;
    line-height: 44px;
  }

  div button {
    width: auto;
    overflow: visible;
    background: transparent;
    margin-top: 44px;
    font-size: 16px;
    background: #ab52ae;
    color: white;
    padding: 8px 16px;
    border-radius: 12px;
    cursor: pointer;
    margin-left: 4px;
  }

  @media ${device.mobile} {
    div {
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
    }

    div h1 {
      font-size: 24px;
    }

    div button {
      margin-top: 32px;
    }
  }
`;

@Component({
  components: {
    MainContainerBlock
  }
})
export default class MainContainer extends Vue {}
</script>
