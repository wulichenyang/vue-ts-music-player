<template lang="pug">
  section.recommend-song-wrapper
    h2.title 推荐歌曲
    lazy-component
      ul.recommend-song-list
        li.item(v-for="item in list" :key="item.id")
          .list-pic-wrapper(@click="")
            img(v-lazy="item.album.picUrl")
          p.text {{item.name}}
          p.singer {{(item.artists.map(artist=>artist.name)).join('/')}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RecommendMusicType, ArtistType } from "@/assets/js/dataType.ts";

@Component({})
export default class RecommendSong extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<RecommendMusicType>;

}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
.recommend-song-wrapper {
  h2.title {
    height: 48px;
    line-height: 48px;
    padding-left: 1.5%;
    text-align: left;
    font-size: $font-size-medium;
    font-weight: bold;
    color: $color-text;
  }
  .recommend-song-list {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    .title {
      height: 65px;
      line-height: 65px;
      padding-left: 1.5%;
      text-align: left;
      font-size: $font-size-medium;
      font-weight: bold;
      color: $color-text;
    }
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
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .text {
        line-height: 16px;
        text-align: left;
        height: 16px;
        @include no-wrap();
        font-size: $font-size-small;
      }
      .singer {
        line-height: 16px;
        margin-bottom: 10px;
        text-align: left;
        @include no-wrap();
        font-size: $font-size-small;
        color: $color-text-g;
      }
    }
  }
}
</style>
