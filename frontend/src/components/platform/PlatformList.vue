<template>
  <PlatformListBlock>
    <PlatformItem v-for="(item, idx) in platforms" :key="idx" :item="item" />
  </PlatformListBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import PlatformItem from "./PlatformItem.vue";

const PlatformListBlock = styled.ul``;

@Component({
  components: {
    PlatformListBlock,
    PlatformItem
  }
})
export default class PlatformList extends Vue {
  @Prop()
  platforms!: Array<string>;
}
</script>
