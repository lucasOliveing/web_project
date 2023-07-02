<script setup>
import { Auth } from '../stores/auth.js'

const auth = Auth()

if(!auth.adsLoaded && auth.logged)
{
  auth.getUserAds();
  auth.adsLoaded = true;
}



</script>

<template>

<router-link to="/">voltar</router-link>

<div v-if="auth.logged" v-for="(anuncio, i) in auth.anuncios.value.anuncios" :key="i" id="ads" class="anuncios">
    <div class="container w-75 position-relative float-start ms-4">
      <div class="row mb-5">

      <div class="col-4 border">
        <p d-flex>title:{{ anuncio.tittle }}</p>
        <p>Price: {{ anuncio.price }}</p>
        <p>description: {{ anuncio.description }}</p>>
      </div>



      <div class="col-8 border">
        <div :id="'slideAnuncio'+ i" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(photo, j) in anuncio.photos">
              <div v-if="j == 0" class="carousel-item active c-item">
                  <img :src="'http://localhost:1337' + photo.url" class="d-block img-fluid c-img" alt="...">
                </div>
                <div v-else class="carousel-item c-item">
                  <img :src="'http://localhost:1337' + photo.url" class="d-block img-fluid c-img" alt="...">
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