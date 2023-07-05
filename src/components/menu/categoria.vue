<script setup>
import { publicContent } from '../../stores/public.js'
import router from '../../router';

const pContent = publicContent()

pContent.getCategorias()
 

async function getCategoryAds(id, name) {
     pContent.getCategoryAds(id)

    if (pContent.categoryAdsButton) {
        await router.push(`/categoria=${name}` )
    } else {
        await router.push('/ads')
    }
}

</script>


<template>
    <div class="container w-25  position-fixed end-0">
        <div class="container-fluid">
            <h1>Category</h1>
            <div class=" border">
                <div class="row" v-for="(categoria, i) in pContent.categorias.value" :key="i">
                    <button class="btn" @click="getCategoryAds(categoria.id, categoria.attributes.name)">
                        <h5> {{ categoria.attributes.name }}</h5>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>