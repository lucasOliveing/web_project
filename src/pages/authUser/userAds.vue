<script>
import { Auth } from '../../stores/auth.js'
import { api } from "../../apiConfig"
import sideMenu from '../../components/canvas/sideMenu.vue'

export default {
  components:{
    sideMenu
  },
  data() {
    return {
      updateBut: 'Editar',
      auth: Auth(),
      

      tittleTemp: '',
      descriptionTemp: '',

    }
  },
  methods: {
    tittleRef(i) {
      return `tittleRef_${i}`
    },
    descriptionRef(i) {
      return `descripRef_${i}`
    },
    buttonsDivRef(i){
      return `buttRef_${i}`
    },
    editing(i){
      const buttons = this.$refs[this.buttonsDivRef(i)][0].children

      buttons[0].style.display = "none"
      buttons[1].style.display = "none"
      buttons[2].style.display = ""
      buttons[3].style.display = ""
      buttons[4].style.display = "none"
      buttons[5].style.display = "none"
    },
    seved(i){
      const buttons = this.$refs[this.buttonsDivRef(i)][0].children

      buttons[0].style.display = ""
      buttons[1].style.display = ""
      buttons[2].style.display = "none"
      buttons[3].style.display = "none"
      buttons[4].style.display = "none"
      buttons[5].style.display = "none"
    },
    deleting(i){
      const buttons = this.$refs[this.buttonsDivRef(i)][0].children

      buttons[0].style.display = "none"
      buttons[1].style.display = "none"
      buttons[2].style.display = "none"
      buttons[3].style.display = "none"
      buttons[4].style.display = ""
      buttons[5].style.display = ""
    },
    updateButton(i) {
      const tittleField = this.$refs[`tittleRef_${i}`][0] ;
      const descripField = this.$refs[`descripRef_${i}`][0];
      this.editing(i)

      
      tittleField.disabled = false
      tittleField.value = this.auth.anuncios.value.anuncios[i].tittle

      descripField.disabled = false
      descripField.value = this.auth.anuncios.value.anuncios[i].description



    },

    saveAbord(i){
      const tittleField = this.$refs[`tittleRef_${i}`][0] ;
      const descripField = this.$refs[`descripRef_${i}`][0];
      const buttons = this.$refs[this.buttonsDivRef(i)][0].children

      buttons[0].style.display = ""
      buttons[1].style.display = ""
      buttons[2].style.display = "none"
      buttons[3].style.display = "none"

      tittleField.disabled = true
      descripField.disabled = true

      tittleField.value = ''
      descripField.value = ''
 
    },
   
    save(i){

      const tittleField = this.$refs[`tittleRef_${i}`][0] ;
      const descripField = this.$refs[`descripRef_${i}`][0];

      this.auth.anuncios.value.anuncios[i].tittle = tittleField.value
      this.auth.anuncios.value.anuncios[i].description = descripField.value

      tittleField.disabled = true
      descripField.disabled = true

      api.put(`anuncios/${this.auth.anuncios.value.anuncios[i].id}`, {
        data:{
        tittle: tittleField.value,
        description: descripField.value,
        }
      }, {
        headers: {
          Authorization: `Bearer ${this.auth.token}`
        }
      }).then(response => console.log(response))

      this.seved(i)
    },
    deleteAd(i){
      api.delete(`anuncios/${this.auth.anuncios.value.anuncios[i].id}`, {
        headers: {
          Authorization: `Bearer ${this.auth.token}`
        }
      }).then(response => console.log(response))

      this.auth.anuncios.value.anuncios.pop(i)
    },
    deleteAbord(i){

      const buttons = this.$refs[this.buttonsDivRef(i)][0].children

      buttons[0].style.display = "" //editar
      buttons[1].style.display = "" //excluir
      buttons[2].style.display = "none" //salvar
      buttons[3].style.display = "none" // abortar

      buttons[4].style.display = "none" //confirmar
      buttons[5].style.display = "none" //abortar

    }
    
    
  
  },



}

</script>

<template>
  
  <div class="container-fluid mb-5">
    <h5 class="position-relative float-start mt-2">Anuncios</h5>
  <button type="button mr-4" class="btn position-relative float-center" data-bs-toggle="offcanvas" data-bs-target="#userAds">Adicionar Anuncio</button>
  <button type="button" class="btn position-relative float-end" id="adm"><router-link to="/main">voltar</router-link></button>
 </div>

 <sideMenu/>

 <div v-if="auth.logged" v-for="(anuncio, i) in auth.anuncios.value.anuncios" :key="i" id="ads">
    <div class="container w-75 position-relative float-start ms-4">
      <div class="row mb-5">


        <div class="col-6 border">
          <div class="container">
            <div class="row">
              <div class="col-9 pt-4">
                <input type="text" class="flex" :placeholder="anuncio.tittle" :disabled="true" style="width: auto;"
                  :ref="tittleRef(i)">
              </div>
              <div class="col-3 pt-3">
                <p>Price: ######{{ anuncio.price }}</p>
              </div>
              <textarea type="text" :placeholder="anuncio.description" :disabled="true" :ref="descriptionRef(i)"></textarea>
            </div>
          </div>
        </div>



        <div class="col-4 border">
          <div :id="'slideAnuncio' + i" class="carousel slide" data-bs-ride="carousel">
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


        <div class="col-2 border" style="justify-content: center;" :ref="buttonsDivRef(i)">
          <button class="btn btn-primary my-3 " @click.prevent="updateButton(i)">Editar</button>
          <button class="btn btn-danger " @click.prevent="deleting(i)">Excluir</button>

          <button class="btn btn-outline-success m-3" @click.prevent="save(i)" style="display: none;">Salvar</button>
          <button class="btn btn-primary" @click.prevent="saveAbord(i)" style="display: none;">Abortar</button>

          <button class="btn btn-danger m-3" @click.prevent="deleteAbord(i)" style="display: none;">Abordar</button>
          <button class="btn btn-danger m-3" @click.prevent="deleteAd(i)" style="display: none;">Confirmar</button>


        </div>

      </div>

    </div>
  </div>
</template>