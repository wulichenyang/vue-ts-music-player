<template lang="pug">
  section#home-top
      router-link(to="/user" v-show="!ifFocusSearch")
        i.iconfont.icon-fenlei.jump-button
      search-box(
        tip="搜索"
        @emitIfFocusSearch="onFocusSearchChange"
      )
      router-link(to="/player" v-show="!ifFocusSearch")
        i.iconfont.icon-music.jump-button
</template>

<script lang="ts">
// import { mapGetters, mapActions } from 'vuex'
// import { Button } from 'element-ui'

// import { Product } from '../store'

// Vue.use(Button)

// 以下是 vue-property-decorator + vuex-class写法：

import { Component, Vue } from "vue-property-decorator";
import SearchBox from "@/components/search-box/search-box.vue";

@Component({
  components: { SearchBox },
})
export default class HomeTop extends Vue {
  public ifFocusSearch: boolean = false;

  public onFocusSearchChange(focused: boolean): void {
    this.ifFocusSearch = focused;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
#home-top {
  height: $top-wrapper-height;
  display: flex;
  justify-content: space-between;
  position: relative;
  text-align: center;
  background: $color-theme;
  z-index: 999;
  .jump-button.iconfont {
    width: $icon-wrapper-width-m;
    height: $icon-wrapper-height-m;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $icon-font-size-s;
    color: $color-theme-l;
  }
  .search-box-main {
    &.onSearch {
      margin-left: 16px;
    }
  }
}
</style>
