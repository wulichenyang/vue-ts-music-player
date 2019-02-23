<template lang="pug">
  section#home-top
      router-link(to="/user" v-show="!ifFocusSearch")
        i.iconfont.icon-fenlei.jump-button
      .search-wrapper(ref="searchBox" :class=" { onSearch : ifFocusSearch }")
        router-link(
          to="/search"
          @click.native="onToSearch"
          )
          .search-box
            input(
              ref="searchInput"
              @focus="onSearchFocus" 
              v-model="searchValue" 
              @keydown="onSearchKeyDown($event)"
              )
            span(ref="searchTip" v-show="!searchValue") 搜索
            i(ref="searchTipicon" v-show="!searchValue").iconfont.icon-search
      router-link(to="/player" v-show="!ifFocusSearch")
        i.iconfont.icon-music.jump-button
      .cancel-search(v-show="ifFocusSearch" @click="onCancelSearch")
        span 取消
      
</template>

<script lang="ts">
// import { mapGetters, mapActions } from 'vuex'
// import { Button } from 'element-ui'

// import { Product } from '../store'

// Vue.use(Button)

// 以下是 vue-property-decorator + vuex-class写法：

import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class HomeTop extends Vue {
  public ifFocusSearch: boolean = false;
  public searchValue: string = "";

  public mounted() {
    if (this.$route.path.indexOf("search") !== -1) {
      this.ifFocusSearch = true;
    }
  }
  // // 返回时检测路由
  // public updated() {
  //   console.log('updated')
  //   if (this.$route.path.indexOf("search") !== -1) {
  //     this.ifFocusSearch = true;
  //   }
  // }

  public onToSearch(): void {
    // const searchInput: any = this.$refs.searchInput
    // searchInput.focus()
    // console.log('ontos')
  }
  public onSearchFocus(): void {
    this.ifFocusSearch = true;
    // const searchBox: any = this.$refs.searchBox;
    // if(!searchBox) return
    // searchBox.style.marginLeft = "10px"
  }
  public onSearchKeyDown(e: any): void {
    const searchTip: any = this.$refs.searchTip;
    const searchTipicon: any = this.$refs.searchTipicon;
    // 退格
    if (e.keyCode === 8 && !this.searchValue) {
      searchTip.style.display = "default";
      searchTipicon.style.display = "default";
      return;
    } else if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 229) {
      searchTip.style.display = "none";
      searchTipicon.style.display = "none";
    }
  }

  public onCancelSearch(): void {
    this.ifFocusSearch = false;
    this.$router.back();
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
  .jump-button.iconfont {
    width: $icon-wrapper-width-m;
    height: $icon-wrapper-height-m;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $icon-font-size-s;
    color: $color-theme-l;
  }
  .search-wrapper {
    &.onSearch {
      margin-left: 16px;
      a {
        input {
        }
        span {
          left: 0 !important;
          transform: translate(30px, -6px) !important;
          transition: all 0.3s ease-in-out;
        }
        i {
          left: 0 !important;
          transform: translate(12px, -6.5px) !important;
          transition: all 0.3s ease-in-out;
        }
      }
    }
    width: 100%;
    margin: auto 5px;
    transition: all 0.3s ease-in-out;
    a {
      display: flex;
      .search-box {
        width: 100%;
        position: relative;
        justify-content: center;
        input {
          // &:focus {
          //   transition: width 0.3s ease-in;
          // }
          width: 100%;
          height: $input-height-s;
          border-radius: $input-border-radius-s;
          text-indent: $input-text-indent-s;
          &:focus {
            outline: none;
          }
        }
        align-items: center;
        span,
        i {
          transition: all 0.3s ease-in-out;
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
        // /* transition */
        // .slide-fade-enter-active {
        //   transition: all 0.3s ease;
        // }
        // .slide-fade-leave-active {
        //   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
        // }
        // .slide-fade-enter, .slide-fade-leave-to
        // /* .slide-fade-leave-active for below version 2.1.8 */ {
        //   transform: translateX(10px);
        //   opacity: 0;
        // }
      }
    }
  }
  .cancel-search {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $font-size-medium;
    color: $color-theme-l;
    white-space: nowrap;
    padding: 0 10px 0 4px;
  }
}
</style>
