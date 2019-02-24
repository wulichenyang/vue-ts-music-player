<template lang="pug">
  section.banner-wrapper 
    p {{JSON.stringify(res)}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getBanner,
 } from "@/api/recommend";
@Component
export default class Banner extends Vue {
  public res: any = {};
  public async mounted() {
    this.res = await getBanner("/banner");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.banner-wrapper {

}
</style>
