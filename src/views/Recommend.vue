<template lang="pug">
  div(class="recommend" ref="recommend")
    scroll(class="recommend-content" 
      ref="scroll"
      :data="playList"
    )
      .decorator
      banner(:banners="banners")
      recommend-list
      Recommend-song
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/banner/banner.vue";
import RecommendList from "@/components/recommend-list/recommend-list.vue";
import RecommendSong from "@/components/recommend-song/recommend-song.vue";
import Scroll from "@/components/scroll/scroll.vue";
import { getBanner } from "@/api/recommend";
import { BannerType }  from '@/assets/js/dataType.ts';

@Component({
  components: {
    Scroll,
    Banner,
    RecommendList,
    RecommendSong
  }
})
export default class Recommend extends Vue {
  public playList: Array<any> = [];
  public banners: Array<BannerType> = [];
  
  public mounted() {
    this.getBanner()
  }
  public async getBanner() {
    const res: Ajax.AxiosResponse = await getBanner("/banner");
    if(res.status === 200) {
      console.log(res)
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.banners = (res.data as any).banners.splice(4)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .decorator {
      position: absolute;
      top: -30vh;
      z-index: -10;
      background: $color-theme;
      width: 100%;
      height: 50vh;
      vertical-align: inherit;
    }
  }
}
</style>

