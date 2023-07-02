<script setup>
import  { publicContent } from '../../stores/public.js'

 const pContent = publicContent()

if(!pContent.cLoaded)
{
  pContent.getCategorias()
  pContent.cLoaded = true
}
 
</script>


<template>

    <div class="container w-25  position-fixed end-0">
        <!-- <p>{{ categorias }}</p> -->
        <div class="container-fluid">
            <h1>Category</h1>
            <div class=" border">
            <h5 v-for="(categoria, i) in pContent.categorias.value" class="c-h5">{{ categoria.attributes.name }}</h5>
        </div>
    </div>
    </div>

</template>