<template lang="pug">
  section.singer-list-wrapper {{list}}
    lazy-component
      //- ul.singer-list
      //-   li.item(
      //-     v-for="item in list" 
      //-     :key="item.id"
      //-     @click=""
      //-   )
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ArtistType } from "@/assets/js/dataType.ts";

@Component({})
export default class RankList extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<ArtistType>;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/mixin.scss";
.rank-list-wrapper {
  .rank-list {

  }
}
</style>
