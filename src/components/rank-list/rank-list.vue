<template lang="pug">
  section.rank-list-wrapper
    lazy-component
      ul.rank-list
        li.item(
          v-for="item in list" 
          :key="item.id"
          @click=""
        )
          .list-pic-wrapper
            img(v-lazy="item.coverImgUrl" width="100" height="100")
          ul.song-list
            li.song(v-for="(song, index) in item.tracks" :key="index")
              span {{index + 1}}. 
              span {{song.first}} - {{song.second}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RankListItemType } from "@/assets/js/dataType.ts";

@Component({})
export default class RankList extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<RankListItemType>;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
.rank-list-wrapper {
  .rank-list {
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
    .item {
      display: flex;
      margin: 0 10px;
      padding: 3px 0;
      height: 100PX;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        padding-bottom: 20px;
      }
      .list-pic-wrapper {
        flex: 0 0 100px;
        width: 100PX;
        height: 100PX;
        img {
          border-radius: 3px;
        }
      }
      .song-list {
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100PX;
        overflow: hidden;
        // background: $color-dialog-background;
        color: $color-text;
        font-size: $font-size-small-x;
        .song {
          @include no-wrap();
          line-height: 30PX;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
    //   }
    // }
  }
}
</style>
