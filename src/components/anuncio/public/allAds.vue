<script setup>
import { onMounted } from 'vue';
import { publicContent } from '../../../stores/public';
import ads from './ads/ads.vue'

const pContent = publicContent()

pContent.getAds()


</script>


<template>
        <ads :anuncios="pContent.anuncios"/>
        
</template>