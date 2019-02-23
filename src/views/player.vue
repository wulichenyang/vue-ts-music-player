<template>
  <main class="player">
    <img src="../assets/logo.png">
    <HelloWorld msg="Player"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Player extends Vue {}
</script>
