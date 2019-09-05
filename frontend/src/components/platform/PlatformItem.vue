<template>
  <PlatformItemBlock>
    <router-link :to="`/posts/${item}`" tag="a">
      <img :src="require(`@/assets/images/${item}.png`)" :alt="item" />
    </router-link>
  </PlatformItemBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

const PlatformItemBlock = styled.li`
  a {
    display: block;
    text-align: center;
    padding: 12px 0px;
    height: 64px;
    position: relative;
  }

  a.on::after {
    content: " ";
    height: 64px;
    width: 4px;
    background: #fff;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  a img {
    width: 64px;
  }

  @media ${device.mobile} {
    display: inline-block;
    width: 16.5%;

    a img {
      width: 54px;
    }

    a.on::after {
      content: " ";
      height: 4px;
      width: 54px;
      bottom: 16px;
      left: 50%;
      top: auto;
      transform: translateX(-50%);
    }
  }
`;

@Component({
  components: {
    PlatformItemBlock
  }
})
export default class PlatformItem extends Vue {
  @Prop()
  item!: string;
}
</script>
