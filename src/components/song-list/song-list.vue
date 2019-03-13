<template lang="pug">
  .song-list
    ul
      li.song-item(
        v-for="(song, index) in songs" 
        :key="song.id"
        @click="selectSong(song, index)"
      )
        p.count {{index+1}}
        div.content
          h2.name {{song.name}}
          p.desc {{getDesc(song)}}
        
          
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Song } from "@/assets/js/dataType.ts";

@Component({})
export default class SongList extends Vue {
  @Prop()
  public songs!: Array<Song>;

  @Emit("select")
  public select(listItem: Song, index: number) {}

  public selectSong(song: Song, index: number): void {
    this.select(song, index);
  }

  public getDesc(song: Song) {
    if (song.aliaName) {
      return `${song.singer} - ${song.aliaName}`;
    } else {
      return `${song.singer}`;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
.song-list {
  .song-item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .count {
      flex: 0 0 50px;
      width: 50px;
      text-align: center;
      color: $color-text-g;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-top: 4px;
        width: 80%;
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        // margin-top: 3px;
        width: 80%;
        font-size: 12px;
        color: $color-text-g;
      }
    }
  }
}
</style>
