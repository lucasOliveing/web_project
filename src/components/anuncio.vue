<script setup>

import { publicContent } from '../stores/public.js'


const pContent = publicContent()

if(!pContent.loaded)
{
  pContent.getAds()
  pContent.loaded = true
}

</script>
<template>
   <!-- <router-link to="userAds">userAds</router-link> -->


  <div v-for="(anuncio, i) in pContent.anuncios.value" :key="i"  class="anuncios">
    <div class="container w-75 position-relative float-start ms-4">
      <div class="row mb-5">

      <div class="col-4 border">
        <p d-flex>title:{{ anuncio.attributes.tittle }}</p>
        <p>Price: {{ anuncio.attributes.price }}</p>
        <p>description: {{ anuncio.attributes.description }}</p>>
      </div>



      <div class="col-8 border">
        <div :id="'slideAnuncio'+ i" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(photo, j) in anuncio.attributes.photos.data">
              <div v-if="j == 0" class="carousel-item active c-item">
                  <img :src="'http://localhost:1337' + photo.attributes.url" class="d-block img-fluid c-img" alt="...">
                </div>
                <div v-else class="carousel-item c-item">
                  <img :src="'http://localhost:1337' + photo.attributes.url" class="d-block img-fluid c-img" alt="...">
                </div>
              </div>
             

            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#slideAnuncio' + i"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#slideAnuncio' + i"
              data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>



      </div>

    </div>
   
  </div>

  
</div>


</template>


