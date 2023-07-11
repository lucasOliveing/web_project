<script setup>
import router from '../../../router';
import { Ads } from '../../../stores/ads.js';
import ShowAds from './showPublicAds/PublicAds.vue'

const ads = Ads()


</script>


<template>
    <ShowAds :anuncios="ads.categoryAds" :empty="ads.categoryEmpty" />
</template>