<template lang="pug">
  section.music-list-wrapper {{playListDetail}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fetchMusicListPayload } from "@/store/modules/musicList";
import { Getter, Action } from "vuex-class";
import { MusicListItemType, PlayListDetailType } from "@/assets/js/dataType.ts";
import { Toast } from "vant";

@Component({})
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
    console.log('created')
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
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.music-list-wrapper {
}
</style>
