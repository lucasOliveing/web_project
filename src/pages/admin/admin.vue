<script>
import anuncios from '../../components/admin/anuncio.vue'
import cabecalho from '../../components/admin/head.vue'
import categorias from '../../components/admin/categoria.vue'


export default{
    components:{
        anuncios,
        cabecalho,
        categorias,
    }
}

</script>


<template>
    <cabecalho/>
    <anuncios/>
    <categorias/>


</template>