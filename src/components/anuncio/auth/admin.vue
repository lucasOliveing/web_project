<script setup>
import { Auth } from '../../../stores/auth';
import ads from './ads/ads.vue'
import headAdm from '../../head/headAdm.vue';
import categoria from '../../menu/categoria.vue';
import navAdm from '../../admin/nav.vue';



const auth = Auth()
</script>


<template>
<headAdm/>
<!-- <div>
<categoria/>
<navAdm/>
</div> -->
<ads :anuncios="auth.anuncios.value.anuncios" />


</template>