<template lang="pug">
  section.rank-list-wrapper {{list}}
    lazy-component
      ul.rank-list
        li.item(v-for="item in list" :key="item.id")

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RankListItemType } from "@/assets/js/dataType.ts";

@Component({})
export default class RankList extends Vue {
  @Prop({
    default: []
  })
  public list!: Array<RankListItemType>;
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.rank-list-wrapper {
  .rank-list {
    
  }
}
</style>
