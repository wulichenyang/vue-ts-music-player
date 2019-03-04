<template lang="pug">
  section.top-wrapper
    .top-left-wrapper(@click="backPrevPage")
      //- i.iconfont.icon-back.jump-button
      van-icon(name="arrow-left")
      span {{tip}}
    .top-center-wrapper
      slot(name="content")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TopBackWrapper extends Vue {
  @Prop(String)
  public tip!: string;
  public backPrevPage(): void {
    this.$router.go(-1);
    console.log('back')
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.top-wrapper {
  height: $top-wrapper-height;
  display: flex;
  justify-content: space-between;
  position: relative;
  text-align: center;
  background: $color-theme;
  font-size: $font-size-medium;
  color: $color-theme-l;
  .top-left-wrapper {
    display: flex;
    cursor:pointer;
    .jump-button.iconfont, .van-icon  {
      width: $icon-wrapper-width-m;
      height: $icon-wrapper-height-m;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $icon-font-size-s;
      color: $color-theme-l;
    }
    span {
      display: flex;
      align-items: center;  
      white-space: nowrap;
    }
  }
  .top-center-wrapper {
    width: 100%;
  }
}
</style>
