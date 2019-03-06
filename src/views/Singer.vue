<template lang="pug">
  div(class="singer" ref="singer")
    scroll(
      class="singer-content" 
      ref="scroll"
      :data="singerList"
    )
      div
        singer-list(:list="singerList")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingerList from "@/components/singer-list/singer-list.vue";
import Scroll from "@/components/scroll/scroll.vue";
// import { Getter, Action } from "vuex-class";
import { RankListItemType, ArtistType } from "@/assets/js/dataType.ts";

import { getHotSingerList } from "@/api/singer";

@Component({
  components: {
    Scroll,
    SingerList
  }
})
export default class Singer extends Vue {
  public singerList: Array<ArtistType> = [];
  // @Getter("userToken") public userToken!: UserTokenType | null;

  public mounted() {
    this.getSingerList();
    // (this.$refs.scroll as any).refresh()
  }

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

  public async getSingerList() {
    const res: Ajax.AxiosResponse = await getHotSingerList();
    if (res.status === 200) {
      console.log(res);
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.singerList = (res.data as any).artists as Array<ArtistType>;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
  .singer-content {
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
  }
}
</style>

