<template lang="pug">
  .song-list-wrapper
    ul.song-list
      li.song-item(
        v-for="(song, index) in songs" 
        :key="song.id"
        @click="selectSong(song)"
      ) {{song.name}}
          
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Song } from "@/assets/js/dataType.ts";

@Component({

})
export default class SongList extends Vue {
  @Prop()
  public songs!: Array<Song>;
  
  @Emit("select")
  public select(listItem: Song) {}

  public selectSong(song: Song): void {
    this.select(song)
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
  section.song-list-wrapper {
    ul.song-list {
      li.song-item {
        
    }
  }
}
</style>
