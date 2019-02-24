<template lang="pug">
  main(class="recommend")
    banner
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/banner/banner.vue"

@Component({
  components: {
    Banner,
  },
})
export default class Recommend extends Vue {}
</script>
