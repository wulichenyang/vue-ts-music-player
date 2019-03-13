<template lang="pug">
  transition(name="slide" mode="out-in")
    div.list-wrapper
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
              section.bg-image(:style="bgStyle")
                .filter
                .text
                  h2.list-title {{title}}
                  p.play-count(v-if="playCount")
                    i.fa.fa-headphones
                    span {{playCount}}
              section.song-list-wrapper
                .sequence-play(v-show="recommendListDetail && recommendListDetail.length" @click="sequence")
                  i.iconfont.icon-bofangicon 
                  span.text 播放全部
                  //- span.count {{`(共${recommendListDetail.length}首)`}}
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
  public scrollY: number = 0;
  public probeType: number = 3;

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
    if (this.playListDetail) {
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
  public sequence() {}
  public scroll(pos: any) {
    this.scrollY = pos.y;
  }
  public selectItem(item: Song, index: number) {
    // this.selectPlay({
    //   list: this.listDetail,
    //   index: index
    // });
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
.list-wrapper {
  background: $color-background;
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
        .bg-image {
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 75%;
          transform-origin: top;
          background-size: cover;
          background-position: 0 30%;
          .filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.2;
          }
          .text {
            position: absolute;
            width: 80%;
            height: 40px;
            bottom: 50px;
            left: 15px;
            color: #fff;
            .play-count {
              position: absolute;
              bottom: -16px;
              font-size: $font-size-small;
            }
            .list-title {
              position: absolute;
              bottom: 0;
              font-size: $font-size-medium-x;
              line-height: 18px;
              font-weight: bold;
              letter-spacing: 1px;
            }
          }
        }
        .song-list-wrapper {
          padding: 41px 0 20px 0;
          border-radius: 10px;
          position: relative;
          top: -20px;
          background: $color-background;
          .sequence-play {
            position: absolute;
            // left: 8;
            top: 0px;
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            padding-left: 16px;
            border-bottom: 1px solid rgb(228, 228, 228);
            .iconfont {
              font-size: 18px;
              color: $color-text;
              padding-right: 14px;
            }
            .text {
              font-size: $font-size-medium-x;
            }
            .count {
              font-size: $font-size-medium;
              color: $color-text-g;
            }
          }
        }
        // position: fixed;
        // top: 0;
        // bottom: 0;
        // width: 100%;
        // background: $color-background;
        // height: 100%;
        // z-index: 20;
        // overflow: hidden;
        // padding: 5px 0 20px 0;
      }
    }
  }
}
</style>
