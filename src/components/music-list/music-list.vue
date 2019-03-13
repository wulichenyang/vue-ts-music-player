<template lang="pug">
  transition(name="slide" mode="out-in")
    div
      TopBackWrapper(
        tip="歌单"
        :style="{backgroundColor: 'transparent', position: 'fixed', top: '0', zIndex: '1001'}"
      )
      section(class="music-list" ref="musicList")
        scroll(
          @scroll="scroll"
          :probe-type="probeType"
          class="music-list-content" 
          ref="list"
          :data="playListDetail && playListDetail.playlist.tracks"
        )
          div
            section.music-list-wrapper
              section.bg-image
                .filter
                .text
                  h2.list-title
                  p.play-count(v-if="playCount")
                    i.fa.fa-headphones
                    span {{playCount}}
              section.song-list-wrapper
                .sequence-play
                song-list(
                  @select="selectItem" 
                  :songs="recommendListDetail"
                )

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fetchMusicListPayload } from "@/store/modules/musicList";
import { Getter, Action } from "vuex-class";
import {
  MusicListItemType,
  PlayListDetailType,
  TrackType,
  Song,
  createRecommendListSong
} from "@/assets/js/dataType.ts";
import Scroll from "@/components/scroll/scroll.vue";
import TopBackWrapper from "@/components/top-back-wrapper/top-back-wrapper.vue";
import { Toast } from "vant";
import SongList from "@/components/song-list/song-list.vue";

@Component({
  components: {
    Scroll,
    TopBackWrapper,
    SongList
  }
})

export default class musicList extends Vue {
  @Getter("musicList")
  public musicList!: (id: number) => PlayListDetailType | null;
  @Action("getMusicList")
  public getMusicList!: any;

  // data
  public id!: number;

  // computed
  get playListDetail(): PlayListDetailType | null {
    return this.musicList(this.id);
  }

  get playCount(): number | null | string {
    if (!this.playListDetail || !this.playListDetail.playlist.playCount) {
      return null;
    }
    if (this.playListDetail.playlist.playCount < 1e5) {
      return Math.floor(this.playListDetail.playlist.playCount);
    } else {
      return Math.floor(this.playListDetail.playlist.playCount / 10000) + "万";
    }
  }

  get bgStyle(): string | void {
    if (this.playListDetail)
      return `background-image: url(${
        this.playListDetail.playlist.coverImgUrl
      })`;
  }

  get title(): string | void {
    if (this.playListDetail) return this.playListDetail.playlist.name;
  }

  get recommendListDetail(): Array<Song> | void {
    if( this.playListDetail ) {
      return this.playListDetail.playlist.tracks.map(item => {
        return createRecommendListSong(item);
      });
    }
  }

  // lifecycle
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

  // method
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
      background-color: $color-background;
    }
  }
}
</style>
