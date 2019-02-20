<template lang="pug">
  section#home-top
      router-link(to="/user")
        i.iconfont.icon-fenlei
      .search-wrapper
        router-link(to="/search")
          .search-box
            input
            span 搜索
            i.iconfont.icon-search
      router-link(to="/player")
        i.iconfont.icon-music
</template>

<script lang="ts">
// import { mapGetters, mapActions } from 'vuex'
// import { Button } from 'element-ui'

// import { Product } from '../store'

// Vue.use(Button)

// 以下是 vue-property-decorator + vuex-class写法：

import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeTop extends Vue {}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
#home-top {
  height: 44px;
  display: flex;
  justify-content: space-between;
  position: relative;
  text-align: center;
  background: $color-theme;
  .iconfont {
    display: block;
    padding: 12px;
    font-size: 18px;
    color: $color-theme-l;
  }
  .search-wrapper {
    margin: auto 5px;
    a {
      display: flex;
      .search-box {
        position: relative;
        justify-content: center;
        input {
          height: 24px;
          border-radius: 18px;
          text-indent: 10px;
          &:focus {
            outline: none
          }
        }
        align-items: center;
        span, i {
          position: absolute;
          top: 50%;
          left: 50%;
        }
        span {
          font-size: $font-size-medium;
          transform: translate(-8px, -6px);
        }
        i {
          transform: translate(-30px, -6.5px);
          padding: 0;
        }
      }
    }
  }
}
</style>
