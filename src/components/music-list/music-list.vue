<template lang="pug">
  transition(name="slide" mode="out-in")
    section(class="music-list" ref="musicList")
      scroll(
        class="music-list-content" 
        ref="scroll"
        :data="playListDetail && playListDetail.playlist.tracks"
      )
        div
          TopBackWrapper(
            tip="歌单"
            :style="{position: 'fixed'}"
          )
          section.music-list-wrapper {{playListDetail}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fetchMusicListPayload } from "@/store/modules/musicList";
import { Getter, Action } from "vuex-class";
import { MusicListItemType, PlayListDetailType } from "@/assets/js/dataType.ts";
import Scroll from "@/components/scroll/scroll.vue";
import TopBackWrapper from "@/components/top-back-wrapper/top-back-wrapper.vue";
import { Toast } from "vant";

@Component({
  components: {
    Scroll,
    TopBackWrapper
  }
})
export default class musicList extends Vue {
  @Getter("musicList")
  public musicList!: (id: number) => PlayListDetailType | null;
  @Action("getMusicList")
  public getMusicList!: any;

  public id!: number;

  // computed
  get playListDetail(): PlayListDetailType | null {
    return this.musicList(this.id);
  }

  public created() {
    this.id = parseInt(this.$route.params.id);
    // store 没有缓存, 获取该歌单的music-list
    if (!this.musicList(this.id)) {
      const fetchMusicListPayload: fetchMusicListPayload = {
        id: this.id
      };
      this.getList(fetchMusicListPayload);
    }
  }

  public async getList(payload: fetchMusicListPayload) {
    let res: // Array<MusicListItemType> |
    boolean = await this.getMusicList(payload);
    if (res === true) {
      // success
      return;
    } else if (res === false) {
      Toast("获取失败");
    }
  }
  public handlePlaylist(playlist: any): void {
    let bottom: string;
    if (playlist.length > 0) {
      bottom = "60px";
    } else {
      bottom = "";
    }

    (this.$refs.musicList as HTMLElement).style.bottom = bottom;
    (this.$refs.scroll as any).refresh();
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.music-list {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 1000;
  .music-list-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .music-list-wrapper {

    }
  }
}
</style>
