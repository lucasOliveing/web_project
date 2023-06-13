<script setup>
import anuncio from './components/anuncio.vue'
import cabecalho from "./components/head.vue"
import categoria from "./components/categoria.vue"


</script>

<template>
  <div class="container overflow-auto">

    <cabecalho />
    <!-- <anuncio />
    <categoria /> -->

  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
