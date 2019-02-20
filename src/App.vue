<template lang="pug">
  #app
    header
      home-top
      home-tab
    main
      keep-alive
        router-view
</template>

<script lang="ts">
import HomeTop from "@/components/home-top/home-top.vue";
import HomeTab from "@/components/home-tab/home-tab.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  // name: "modules",
  components: { HomeTop, HomeTab },
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
