<script setup>

import addImg from './components/formulario/addAds.vue'
</script>

<template>
    
    <main class="container overflow-auto">
      <!-- <router-view></router-view> -->
      <addImg/>
    </main>
    

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
