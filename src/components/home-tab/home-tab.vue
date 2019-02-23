<template lang="pug">
  section#home-tab
    nav#nav
      router-link(to="/recommend") 推荐
      router-link(to="/rank") 排行
      router-link(to="/singer") 歌手
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeTab extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
#home-tab {
  height: $top-wrapper-height;
  background: $color-theme;
  font-size: $font-size-medium;
  #nav {
    height: 100%;
    display: flex;
    align-items: center;
      a {
        width: $nav-botton-width;
        margin: 0 auto;
        padding-bottom: 4px;
        color: $color-text-lm;
        text-align: center;
        align-items: center;
        &.router-link-active {
          font-weight: bold;
          color: $color-text-l;
          border-bottom: 2px solid $color-text-l;
      }
    }
  }
}
</style>
