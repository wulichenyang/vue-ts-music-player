<template lang="pug">
  .search-box-main(ref="searchBox" :class=" { onSearch : ifFocusSearch }")
    .search-wrapper(@click="onPressSearch")
      router-link(
        to="/search"
        )
        .search-box
          input(
            ref="searchInput"
            @focus="onSearchFocus" 
            v-model="searchValue" 
            @keydown="onSearchKeyDown($event)"
            )
          span(ref="searchTip" v-show="!searchValue") {{tip}}
          i(ref="searchTipicon" v-show="!searchValue").iconfont.icon-search
    .cancel-search(v-show="ifFocusSearch" @click="onCancelSearch")
      span 取消
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class SearchBox extends Vue {
  public searchValue: string = "";
  public ifFocusSearch: boolean = false;

  @Prop({
    default: "搜索",
  })
  public tip!: string;

  @Emit("emitIfFocusSearch")
  public emitIfFocusSearch(item: boolean): boolean {
    return item;
  }

  public mounted() {
    if (this.$route.path.indexOf("search") !== -1) {
      this.ifFocusSearch = true;
      this.emitIfFocusSearch(true);
    }
  }
  // 返回时检测路由改变
  // public beforeRouteUpdate(to: any, from: any, next: any) {
  // 返回是search
  // const toPath: string = to.path;
  // if (toPath.indexOf("search") !== -1) {
  // console.log('hh',to.path);
  //   this.ifFocusSearch = true;
  //   this.emitIfFocusSearch();
  // } else if (toPath.indexOf("search") === -1) {
  // console.log('hh',to.path);
  //   // 返回其他页面 重置
  //   this.ifFocusSearch = false;
  //   this.emitIfFocusSearch();
  // }
  // }

  public onPressSearch(): void {
    const searchInput: any = this.$refs.searchInput;
    searchInput.focus();
  }

  public onSearchFocus(): void {
    this.ifFocusSearch = true;
    this.emitIfFocusSearch(true);
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
    this.emitIfFocusSearch(false);
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.search-box-main {
  width: 100%;
  display: flex;
  margin: auto 5px;
  transition: all 0.3s ease-in-out;
  justify-content: center;
  &.onSearch {
    .search-wrapper {
      width: 100%;
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
  }
  .search-wrapper {
    width: 100%;
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
          height: 24px;
          border-radius: 18px;
          text-indent: 10px;
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
</style>
