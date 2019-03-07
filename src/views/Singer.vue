<template lang="pug">
  div(class="singer" ref="singer")
    singer-list(:list="singerList")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingerList from "@/components/singer-list/singer-list.vue";
// import { Getter, Action } from "vuex-class";
import {
  RankListItemType,
  ArtistType,
  SingerListItemType,
  Singer
} from "@/assets/js/dataType.ts";

import { getHotSingerList } from "@/api/singer";
const pinyin = require('pinyin')

@Component({
  components: {
    SingerList
  }
})


export default class SingerPage extends Vue {
  private HOT_NAME = '热门'
  private HOT_SINGERS_NUM = 10
  public singerList: Array<SingerListItemType> = [];
  // @Getter("userToken") public userToken!: UserTokenType | null;

  public created() {
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
  public toSingerList(artists: Array<ArtistType>): Array<SingerListItemType> {
    let singerList: Array<SingerListItemType> = [];
    const hotArtists: Array<ArtistType> = artists.slice(0, this.HOT_SINGERS_NUM)
    const hotItems: Array<Singer> = hotArtists.map((artist: ArtistType) => {
        return new Singer(
          artist.id,
          artist.name,
          artist.picUrl,
          artist.alias.join('/')
        )
      })
    // 10 hotest singers
    singerList.push({
      title: this.HOT_NAME,
      items: hotItems
    })
    // return all 100 artists with an extra prop of first letter
    let artistsTemp = (artists.slice(0))as any
    artistsTemp.map((artist: any) => {
      let py = pinyin(artist.name[0], {
        style: pinyin.STYLE_FIRST_LETTER
      })
      artist.initial = py[0][0].toUpperCase()
    })
    // sort 100 artists
    artistsTemp = artistsTemp.sort((a: any, b: any) => {
      return a.initial.charCodeAt(0) - b.initial.charCodeAt(0)
    })

    // add 100 sorted singer into singerMap
    let singerMap: any = {
      // 'A': {
      //    title: 'A'
      //    items: [
        //   Singer1,
        //   Singer2,
      //    ]
      // }
    }
    artistsTemp.map((artist: any) => {
      if(!singerMap[artist.initial]) {
        singerMap[artist.initial] = {
          title: artist.initial,
          items: []
        }
      }
      singerMap[artist.initial].items.push(new Singer(
        artist.id,
        artist.name,
        artist.picUrl,
        artist.alias.join('/')
      ))
    })
    // drill out singerArray from singerMap
    for(let key in singerMap) {
      singerList.push({
        title: key,
        items: singerMap[key].items
      })
    }
    console.log(singerList)
    return singerList
  }
  public async getSingerList() {
    const res: Ajax.AxiosResponse = await getHotSingerList();
    if (res.status === 200) {
      console.log(res);
      // 网易云音乐的接口返回的属性不确定 转化为any
      this.singerList = this.toSingerList((res.data as any).artists as Array<
        ArtistType
      >);
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

}
</style>

