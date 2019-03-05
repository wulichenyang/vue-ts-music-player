<template lang="pug">
  section.recommend-list-wrapper
    h2.title 推荐歌单
    lazy-component
      ul.recommend-list
        li.item(v-for="item in list" :key="item.id")
          .list-pic-wrapper(@click="")
            .gradients
            img(v-lazy="item.picUrl")
          p.play-count
            van-icon(name="audio")
            span {{Math.floor(item.playcount / 10000)}}万
          .desc
            p.name {{item.name}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RecommendListItemType } from "@/assets/js/dataType.ts";

@Component({})
export default class RecommendList extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<RecommendListItemType>;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.recommend-list-wrapper {
  h2.title {
    height: 48px;
    line-height: 48px;
    padding-left: 1.5%;
    text-align: left;
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-text;
  }
  .recommend-list {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    .item {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      width: 33%;
      padding: 0 1%;
      .list-pic-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
        margin-bottom: 5px;
        .gradients {
          position: absolute;
          top: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(
            rgba(109, 109, 109, 0.4),
            rgba(255, 255, 255, 0)
          );
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .play-count {
        display: flex;
        align-items: center;
        position: absolute;
        top: 5px;
        right: 8px;
        font-size: $font-size-small-s;
        color: $color-text-l;
        i {
          margin-right: 1px;
        }
      }
      .desc {
        // 移动端单行数据自动坍缩bug
        float: left;
        text-align: left;
        height: 40px;
        line-height: 16px;
        overflow: hidden;
        margin-bottom: 10px;
        font-size: $font-size-small;
      }
    }
  }
}
</style>
