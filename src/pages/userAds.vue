<script setup>
import userAds from '../components/userAds.vue'
import { Auth } from '../stores/auth.js'

const auth = Auth()

if(!auth.adsLoaded && auth.logged)
{
  auth.getUserAds();
  auth.adsLoaded = true;
}


</script>

<template>
<router-link to="/">voltar</router-link>
<userAds/>

</template>