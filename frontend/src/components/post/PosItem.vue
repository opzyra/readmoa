<template>
  <PostItemBlock>
    <a :href="item.url" target="_blank">
      <h2>{{item.title}}</h2>
      <p>{{item.description}}</p>
      <div>
        <span>{{item.name}}</span>
        <span class="date">{{formatDate(item.writed_at)}}</span>
      </div>
    </a>
  </PostItemBlock>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import styled from "vue-styled-components";

import moment from "moment";

const PostItemBlock = styled.li`
  position: relative;
  width: 32.1%;
  display: inline-block;
  border: 1px solid #dedede;
  font-size: initial;
  margin-right: 28px;
  margin-bottom: 28px;

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

  &:after,
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

  &:hover:after,
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
    return moment(date).format("YYYY.MM.DD HH:mm");
  }
}
</script>
