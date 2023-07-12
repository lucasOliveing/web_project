<script setup>
import { Ads } from '../../stores/ads.js';
import router from '../../router';

const ads = Ads()

ads.getCategories()

const rota = defineProps({ In: String, Out: String, user:Boolean })


function getCategoryAds(id, name) {
    if(rota.user)
        ads.getUsersCategoryAds(id)
    else
        ads.getCategoryAds(id, rota.user)

    if (ads.categoryAdsButton) {
        router.push(`${rota.In}${name}`)
    } else {
        router.push(`${rota.Out}`)
    }
}

</script>


<template>
    <div class="container-fluid">
        <h1>Category</h1>
        <div class=" border">
            <div class="row" v-for="(categoria, i) in ads.categorias.value" :key="i">
                <button class="btn" @click="getCategoryAds(categoria.id, categoria.attributes.name)">
                    <h5> {{ categoria.attributes.name }}</h5>
                </button>
            </div>
        </div>
    </div>
</template>