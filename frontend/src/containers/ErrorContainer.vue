<template>
  <ErrorContainerBlock>
    <ErrorInfo :isButton="true">
      <h3>
        페이지를 찾을수 없습니다.
        <br />URL을 확인해주세요.
      </h3>
    </ErrorInfo>
  </ErrorContainerBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

import ErrorInfo from "@/components/common/ErrorInfo.vue";

const ErrorContainerBlock = styled.main``;

@Component({
  components: {
    ErrorContainerBlock,
    ErrorInfo
  }
})
export default class ErrorContainer extends Vue {}
</script>
