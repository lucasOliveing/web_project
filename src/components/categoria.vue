<script setup>
import  { publicContent } from '../stores/public.js'
import { api } from '../apiConfig.js'
import router from '../router';

const pContent = publicContent()

if(!pContent.cLoaded)
{
  pContent.getCategorias()
  pContent.cLoaded = true
}

function getCategoryAds(id, name){
    pContent.getCategoryAds(id)
    
    if(pContent.categoryAdsButton){
        router.push('/categoria=' + name)
    }else{
        router.push('/main')
    }
}

</script>


<template>

    <div class="container w-25  position-fixed end-0">
        <!-- <p>{{ categorias }}</p> -->
        <div class="container-fluid">
            <h1>Category</h1>
            <div class=" border">
        <button v-for="(categoria, i) in pContent.categorias.value" class="btn" :key="i" @click="getCategoryAds(categoria.id, categoria.attributes.name)"><h5 > {{ categoria.attributes.name }}</h5></button>
        </div>
    </div>
    </div>

</template>