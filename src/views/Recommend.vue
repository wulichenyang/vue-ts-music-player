<template>
  <main class="recommend">
    <img src="../assets/logo.png">
    <HelloWorld msg="recommend"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Recommend extends Vue {}
</script>
