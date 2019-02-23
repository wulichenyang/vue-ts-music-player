<template lang="pug">
  main(class="user")
    top-back-wrapper(tip="歌曲")
      <template slot="content">
        p 歌曲历史
      </template>
    img(src="../assets/logo.png")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBackWrapper from "@/components/top-back-wrapper/top-back-wrapper.vue"; // @ is an alias to /src

@Component({
  components: {
    TopBackWrapper,
  },
})
export default class User extends Vue {}
</script>
