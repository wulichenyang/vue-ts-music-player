<template lang="pug">
  scroll(
    class="singer-content" 
    ref="scroll"
    :data="list"
  )
    section.singer-list-wrapper
      lazy-component
        ul.singer-list
          li.list-group(
            v-for="(group, index) in list" 
            :key="index"
          )
            h2.list-group-title {{group.title}}
            ul
              li.singer-item(
                @click=""
                v-for="singer in group.items"
                :key="singer.id"
              )
                .avatar
                  img(v-lazy="singer.avatar")
                span.name {{singer.name}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ArtistType } from "@/assets/js/dataType.ts";
import Scroll from "@/components/scroll/scroll.vue";

@Component({
  components: {
    Scroll
  }
})
export default class RankList extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<ArtistType>;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
.singer-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  section.singer-list-wrapper {
    .list-group {
      // padding: 10px 0;
      .list-group-title {
        height: 20px;
        line-height: 20px;
        padding-left: 12px;
        margin-bottom: 10px;
        font-size: $font-size-small;
        color: #fff;
        background: rgba(0, 0, 0, 0.2);
      }
      .singer-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        margin: 0 5px;
        border-bottom: 1px solid rgb(228, 228, 228);
        &:last-child {
          border: none;
          margin-bottom: 10px;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 3px;
          overflow: hidden;
          img {
            height: 50px
          }
        }
        .name {
          margin-left: 20px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 200px 0;
      border-radius: 3px;
      text-align: center;
      font-family: Helvetica;
      .item {
        padding: 5px 5px;
        line-height: 1;
        color: $color-text-g;
        font-size: $font-size-small;
        font-weight: bold;
        &.current {
          color: $color-theme;
        }
      }
    }
    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 20px;
        line-height: 20px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
