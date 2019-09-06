<template>
  <PostItemBlock>
    <a :href="item.url" target="_blank">
      <h2>{{item.title}}</h2>
      <p>{{item.description}}</p>
      <div>
        <span>{{item.name}}</span>
        <span class="new" v-if="isNew(item.writed_at)">NEW</span>
        <span class="date" v-else>{{formatDate(item.writed_at)}}</span>
      </div>
    </a>
  </PostItemBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import device from "@/lib/device";

import moment from "moment";

const PostItemBlock = styled.li`
  position: relative;
  width: 32.1%;
  display: inline-block;
  border: 1px solid #dedede;
  font-size: initial;
  margin-right: 28px;
  margin-bottom: 28px;
  box-sizing: border-box;

  &:nth-child(3n) {
    margin-right: 0px;
  }

  a {
    padding: 24px 32px;
    display: block;
    box-sizing: border-box;
  }

  &:hover,
  &:focus {
    border: 1px solid rgba(97, 50, 160, 0.9);
  }

  &:after {
    content: "";
    width: 80px;
    height: 80px;
    border: transparent;
    border-left: 1px solid #dedede;
    position: absolute;
    bottom: -41px;
    right: -41px;
    transform: rotate(45deg);
    background: #fff;
  }

  &:hover:after {
    border-left: 1px solid rgba(97, 50, 160, 0.9);
  }

  a h2 {
    font-size: 20px;
    margin-bottom: 12px;
    font-weight: bold;
    color: #333;
    height: 58px;
  }

  a p {
    font-size: 16px;
    margin-bottom: 8px;
    height: 125px;
  }

  a div {
    font-size: 14px;
  }

  a div .date {
    margin-left: 4px;
  }

  a div .new {
    margin-left: 4px;
    color: #ab52ae;
    font-weight: bold;
  }

  @media ${device.desktop} {
    width: 31.8%;

    a p {
      height: 180px;
    }
  }

  @media ${device.laptop} {
    width: 48%;

    a p {
      height: 210px;
    }

    a h2 {
      height: 78px;
    }

    &:nth-child(3n) {
      margin-right: 28px;
    }

    &:nth-child(2n) {
      margin-right: 0px;
    }
  }

  @media ${device.mobile} {
    width: 100%;
    margin-right: 0px !important;
    margin-bottom: 20px;

    a {
      padding: 16px 20px;
    }

    a h2 {
      height: auto;
      min-height: 58;
    }

    a p {
      height: auto;
      min-height: 125px;
    }

    &:after {
      display: none;
    }
  }
`;

@Component({
  components: {
    PostItemBlock
  }
})
export default class PostItem extends Vue {
  @Prop()
  item!: Object;

  formatDate(date: Date) {
    return moment(date).format("YYYY.MM.DD");
  }

  isNew(date: Date) {
    const yesterday = moment()
      .subtract("1", "day")
      .format("YYYY.MM.DD");
    const writeDate = this.formatDate(date);
    if (yesterday == writeDate) {
      return true;
    }
    return false;
  }
}
</script>
