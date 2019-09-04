<template>
  <PlatformListBlock :class="isToggled ? 'on' : ''">
    <PlatformItem v-for="(item, idx) in platforms" :key="idx" :item="item" />
  </PlatformListBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

import PlatformItem from "./PlatformItem.vue";

const PlatformListBlock = styled.ul`
  @media ${device.mobile} {
    & {
      display: none;
    }

    &.on {
      display: block;
    }
  }
`;

@Component({
  components: {
    PlatformListBlock,
    PlatformItem
  }
})
export default class PlatformList extends Vue {
  @Prop()
  platforms!: Array<string>;

  @Prop()
  isToggled!: boolean;
}
</script>
