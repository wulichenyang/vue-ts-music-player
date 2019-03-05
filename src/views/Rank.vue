<template lang="pug">
  div(class="rank" ref="rank")
    scroll(
      class="rank-content" 
      ref="scroll"
      :data="rankList"
    )
      div
        rank-list(:list="rankList")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RankList from "@/components/rank-list/rank-list.vue";
import Scroll from "@/components/scroll/scroll.vue";
// import { Getter, Action } from "vuex-class";
import {
  RankListItemType
} from "@/assets/js/dataType.ts";

import {
  getRankList,
} from "@/api/rank";

@Component({
  components: {
    Scroll,
    RankList,
  }
})
export default class Recommend extends Vue {
  public rankList: Array<RankListItemType> = [];
  // @Getter("userToken") public userToken!: UserTokenType | null;

  public mounted() {
    this.getRankList();
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

  public async getRankList() {
    const res: Ajax.AxiosResponse = await getRankList();
    if (res.status === 200) {
      console.log(res);
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.rankList = (res.data as any).list as Array<
        RankListItemType
      >;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
}
</style>

