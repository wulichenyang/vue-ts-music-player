<template lang="pug">
  div(class="recommend" ref="recommend")
    scroll(
      class="recommend-content" 
      ref="scroll"
      :data="recommendList"
    )
      div
        .decorator
        section.banner-wrapper
          banner(
            :banners="banners"
            v-if="banners.length"  
            @clickBanner="onClickBanner"
          )
        recommend-list(:list="recommendList")
        Recommend-song(:list="recommendMusic")
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Banner from "@/components/banner/banner.vue";
import RecommendList from "@/components/recommend-list/recommend-list.vue";
import RecommendSong from "@/components/recommend-song/recommend-song.vue";
import Scroll from "@/components/scroll/scroll.vue";
import AES from "@/assets/js/crypto.ts";
import { Getter, Action } from "vuex-class";
import {
  UserTokenType,
  RecommendListItemType,
  RecommendMusicType
} from "@/assets/js/dataType.ts";

import {
  getBanner,
  getSongDetail,
  getAlbumDetail,
  getRecommendList,
  getRecommendSongs
} from "@/api/recommend";
import { getLoginStatus, logout } from "@/api/user";
import { BannerType, TargetType } from "@/assets/js/dataType.ts";

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
  public recommendList: Array<RecommendListItemType> = [];
  public recommendMusic: Array<RecommendMusicType> = [];
  @Getter("userToken") public userToken!: UserTokenType | null;
  // @Watch("recommendList")
  // onRecommendListChanged(val: any, oldVal: any) {
  //   this.handlePlaylist(val);
  // }
  public mounted() {
    this.getBanner();
    this.getRecommendList();
    this.getRecommendSongs();
    // (this.$refs.scroll as any).refresh()
  }
  // public test(): void {
  //   const a = AES.Encrypt('helo')
  //   // const secret = crypto.createHash("md5").update(pwd, 'hex').digest('hex')
  //   console.log('sec: ', a)
  //   console.log('dec: ', AES.Decrypt(a))
  // }
  // public async test() {
  //   getLoginStatus();
  // }
  public handlePlaylist(playlist: any): void {
    let bottom: string;
    if (playlist.length > 0) {
      bottom = "60px";
    } else {
      bottom = "";
    }

    (this.$refs.recommend as HTMLElement).style.bottom = bottom;
    (this.$refs.scroll as any).refresh();
  }
  public async getBanner() {
    const res: Ajax.AxiosResponse = await getBanner();
    if (res.status === 200) {
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.banners = (res.data as any).banners;
    }
  }
  public async getRecommendList() {
    const res: Ajax.AxiosResponse = await getRecommendList();
    if (res.status === 200) {
      console.log(res);
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.recommendList = (res.data as any).recommend as Array<
        RecommendListItemType
      >;
    }
  }

  public async getRecommendSongs() {
    const res: Ajax.AxiosResponse = await getRecommendSongs();
    if (res.status === 200) {
      console.log(res);
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.recommendMusic = (res.data as any).recommend as Array<
        RecommendMusicType
      >;
    }
  }

  public async onClickBanner(banner: BannerType) {
    if (banner.targetType === TargetType.SONG) {
      getSongDetail(banner.targetId);
    } else if (banner.targetType === TargetType.ALBUM) {
      getAlbumDetail(banner.targetId);
    } else if (banner.targetType === TargetType.LINK) {
      window.open(banner.url);
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
      top: -35vh;
      z-index: -10;
      background: $color-theme;
      width: 100%;
      height: 50vh;
      vertical-align: inherit;
    }
    .banner-wrapper {
      width: auto;
      margin: 0 10px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>

