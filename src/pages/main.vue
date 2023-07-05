<script setup>
import cabecalho from '../components/head/head.vue'
import categoria from "../components/menu/categoria.vue"
import router from '../router'
import sideMenu from "../components/menu/sideMenu.vue"
import { Auth } from "../stores/auth"

import categoryAds from '../components/anuncio/public/categoryAds.vue'

import { publicContent } from '../stores/public'


import { onMounted } from 'vue'



onMounted(() => {
    router.push('/ads')
})

</script>

<template>
    <sideMenu />
    <cabecalho />
    <categoria />


    <div>
        <router-view></router-view>
    </div>



    <!-- testing -->
</template>