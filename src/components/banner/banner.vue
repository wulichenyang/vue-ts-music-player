<template lang="pug">
  section.banner-wrapper 
    p {{JSON.stringify(banners)}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BannerType }  from '@/assets/js/dataType.ts';

@Component
export default class Banner extends Vue {
@Prop({
  default: []
})
banners!: Array<BannerType>
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.banner-wrapper {

}
</style>
