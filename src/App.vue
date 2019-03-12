<template lang="pug">
  #app
    header
      home-top
      home-tab
    main.main-wrapper
      keep-alive
        router-view
</template>

<script lang="ts">
import HomeTop from "@/components/home-top/home-top.vue";
import HomeTab from "@/components/home-tab/home-tab.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  // name: "modules",
  components: { HomeTop, HomeTab }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import "~@/assets/scss/index.scss";
#app {
  // for transition of Vue.js
  .slide-enter-active {
    transition: all 0.2s;
  }
  .slide-leave-active {
    transition: all 0.1s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
  }

  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  header {
    background-color: $color-theme;
    position: relative;
    z-index: 999;
  }
  main.main-wrapper {
    height: 100%;
  }
}
</style>
