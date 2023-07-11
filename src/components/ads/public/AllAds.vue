<script setup>
import { Ads } from '../../../stores/ads.js';
import ShowAds from './showPublicAds/PublicAds.vue'

const ads = Ads()

ads.getAds()


</script>

<template>
        <ShowAds :anuncios="ads.anuncios" />
</template>