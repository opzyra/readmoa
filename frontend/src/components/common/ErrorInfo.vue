<template>
  <ErrorInfoBlock>
    <div>
      <img src="@/assets/images/error_bot.png" alt="error" />
      <slot></slot>
      <Button :text="`메인화면`" :to="`/`" v-show="isButton" />
    </div>
  </ErrorInfoBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import Button from "@/components/common/Button.vue";

const ErrorInfoBlock = styled.div`
  height: 100vh;
  width: 100%;
  margin: -28px 0px;

  & > div {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  & > div img {
    width: 360px;
  }

  & > div h3 {
    font-size: 20px;
    margin-top: 12px;
    font-weight: bold;
    line-height: 32px;
  }
`;

@Component({
  components: {
    ErrorInfoBlock,
    Button
  }
})
export default class ErrorInfo extends Vue {
  @Prop()
  isButton!: boolean;
}
</script>
