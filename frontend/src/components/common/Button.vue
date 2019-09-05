<template>
  <ButtonBlock>
    <router-link tag="button" :to="to">{{text}}</router-link>
  </ButtonBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

const ButtonBlock = styled.div`
  button {
    width: auto;
    overflow: visible;
    background: transparent;
    margin-top: 36px;
    font-size: 16px;
    background: #ab52ae;
    color: white;
    padding: 8px 16px;
    border-radius: 12px;
    cursor: pointer;
    margin-left: 4px;
  }

  @media ${device.mobile} {
    button {
      margin-top: 32px;
    }
  }
`;

@Component({
  components: {
    ButtonBlock
  }
})
export default class Button extends Vue {
  @Prop()
  text!: string;

  @Prop()
  to!: string;
}
</script>
