<script setup>
import { publicContent } from '../../../stores/public';
import ads from './ads/ads.vue'

const pContent = publicContent()

</script>


<template>

<ads :anuncios="pContent.categoryAds" :empty="pContent.categoryEmpty"/>

</template>