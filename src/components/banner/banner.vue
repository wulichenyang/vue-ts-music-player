<template lang="pug">
  lazy-component
    slider(v-if="banners.length")
      div(
        v-for="(banner, id) in banners"
        :key="id"
        @click.stop="emitClickBanner(banner)"
      )
        img(:src="banner.imageUrl" v-lazy:background-image="banner.imageUrl")
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { BannerType } from "@/assets/js/dataType.ts";

import Slider from "@/components/slider/slider.vue";
@Component({
  components: {
    Slider,
  }
})
export default class Banner extends Vue {
  @Prop({
    default: []
  })
  banners!: Array<BannerType>;
  @Emit("clickBanner")
  public emitClickBanner(banner: BannerType) {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
</style>
