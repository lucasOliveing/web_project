<script setup>
import router from './router/index.js'
import anuncio from './components/anuncio.vue'
import cabecalho from "./components/head.vue"
import categoria from "./components/categoriaBar.vue"


</script>

<template>
    
   <!--  <main class="container overflow-auto">
      <cabecalho />
      <anuncio />
      <categoria />
        
    </main> -->

    <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>

    <router-view></router-view>
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
