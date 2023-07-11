<script setup>
import { Auth } from '../../../stores/user.js';
import { Ads } from '../../../stores/ads'
import router from '../../../router';

import ShowUserAds from './ShowUserAds/UserAds.vue'

const user = Auth()
const ads = Ads()




ads.getUserAds(user.id)

console.log(ads.userAnuncios)
</script>

<template>
    <div v-if="ads.categoryAdsButton">
        <ShowUserAds :anuncios="ads.categoryAds" />
    </div>
    <div v-else>
        <ShowUserAds :anuncios="ads.userAnuncios" />
    </div>
</template>