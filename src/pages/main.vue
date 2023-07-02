<script setup>
import anuncio from '../components/anuncio.vue'
import cabecalho from "../components/head.vue"
import categoria from "../components/categoria.vue"
import forms from "../components/formulario/addAds.vue"

import { publicContent } from '../stores/public'
import router from '../router'


</script>

<template>
    <!-- <forms/> -->
    <cabecalho />
    <categoria />
    <router-view></router-view>


    <!-- testing -->
</template>