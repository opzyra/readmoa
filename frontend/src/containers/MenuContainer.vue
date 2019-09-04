<template>
  <SideMenuBlock :class="isToggled ? 'on' : ''">
    <router-link to="/" tag="a" class="logo">
      <img src="@/assets/images/logo_white.png" alt="logo" />
      <h3>READMOA</h3>
    </router-link>
    <span class="bar" @click="toggleMenu">
      <img src="@/assets/images/bar.png" alt="bar" />
    </span>
    <PlatformList :platforms="platforms" :isToggled="isToggled" />
  </SideMenuBlock>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

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
  z-index: 1;

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

  .bar {
    display: none;
  }

  @media ${device.mobile} {
    width: 100%;
    height: 80px;

    &.on {
      height: 260px;
    }

    .logo {
      display: flex;
      padding: 10px;
      margin: 0px;
      vertical-align: middle;
      align-items: center;
      width: 50%;
    }

    .logo img {
      width: 60px;
    }

    .logo h3 {
      font-size: 24px;
    }

    .bar {
      display: block;
      position: absolute;
      top: 28px;
      right: 4px;
      text-align: center;
      cursor: pointer;
    }
    .bar img {
      width: 40%;
    }
  }
`;

@Component({
  components: {
    SideMenuBlock,
    PlatformList
  }
})
export default class SideMenu extends Vue {
  isToggled: boolean = false;

  get platforms() {
    return this.$store.state.platforms;
  }
  toggleMenu() {
    this.isToggled = !this.isToggled;
  }
}
</script>
