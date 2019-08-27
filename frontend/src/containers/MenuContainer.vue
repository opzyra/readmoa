<template>
  <SideMenuBlock>
    <router-link to="/" tag="a" class="logo">
      <img src="@/assets/images/logo_white.png" alt="logo" />
      <h3>READMOA</h3>
    </router-link>
    <PlatformList :platforms="platforms" />
  </SideMenuBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import PlatformList from "../components/platform/PlatformList.vue";

const SideMenuBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(163, 63, 165, 0.9),
    rgba(97, 50, 160, 0.9)
  );
  width: 112px;
  height: 100vh;

  .logo {
    display: block;
    text-align: center;
    padding: 28px 0;
    margin-bottom: 40px;
  }

  .logo img {
    width: 80px;
  }

  .logo h3 {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
`;

@Component({
  components: {
    SideMenuBlock,
    PlatformList
  }
})
export default class SideMenu extends Vue {
  get platforms() {
    return this.$store.state.platforms;
  }
  created() {}
}
</script>
