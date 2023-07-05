<script>
import { onMounted } from 'vue'
import { Auth } from '../../../../stores/auth'
import { api } from '../../../../apiConfig'
import sideMenu from '../../../menu/sideMenu.vue'
import router from '../../../../router'

export default {
    props: {
        'anuncios': Array,
        'empty': Boolean
    },
    components: {
        sideMenu
    },

    data() {

        onMounted(() => {
            if (!this.userLogged()) {
                router.push('/main')
            }
        })
        return {
            updateBut: 'Editar',
            auth: Auth(),


            tittleTemp: '',
            descriptionTemp: '',

        }
    },
    methods: {
        userLogged() {
            return this.auth.logged
        },
        tittleRef(i) {
            return `tittleRef_${i}`
        },
        stateRef(i) {
            return `stateRef_${i}`
        },
        priceRef(i) {
            return `priceRef_${i}`
        },
        descriptionRef(i) {
            return `descripRef_${i}`
        },
        buttonsDivRef(i) {
            return `buttRef_${i}`
        },
        editing(i) {
            const buttons = this.$refs[this.buttonsDivRef(i)][0].children

            buttons[0].style.display = "none"
            buttons[1].style.display = "none"
            buttons[2].style.display = ""
            buttons[3].style.display = ""
            buttons[4].style.display = "none"
            buttons[5].style.display = "none"
        },
        seved(i) {
            const buttons = this.$refs[this.buttonsDivRef(i)][0].children

            buttons[0].style.display = ""
            buttons[1].style.display = ""
            buttons[2].style.display = "none"
            buttons[3].style.display = "none"
            buttons[4].style.display = "none"
            buttons[5].style.display = "none"
        },
        deleting(i) {
            const buttons = this.$refs[this.buttonsDivRef(i)][0].children

            buttons[0].style.display = "none"
            buttons[1].style.display = "none"
            buttons[2].style.display = "none"
            buttons[3].style.display = "none"
            buttons[4].style.display = ""
            buttons[5].style.display = ""
        },
        updateButton(i) {
            const stateField = this.$refs[this.stateRef(i)][0]
            const priceField = this.$refs[`priceRef_${i}`][0];
            const tittleField = this.$refs[`tittleRef_${i}`][0];
            const descripField = this.$refs[`descripRef_${i}`][0];
            this.editing(i)



            tittleField.disabled = false
            tittleField.value = this.auth.anuncios.value.anuncios[i].tittle

            descripField.disabled = false
            descripField.value = this.auth.anuncios.value.anuncios[i].description

            priceField.disabled = false
            priceField.value = this.auth.anuncios.value.anuncios[i].preco

            stateField.disabled = false
            stateField.value = this.auth.anuncios.value.anuncios[i].estado


        },

        saveAbord(i) {
            const stateField = this.$refs[this.stateRef(i)][0]
            const priceField = this.$refs[`priceRef_${i}`][0]
            const tittleField = this.$refs[`tittleRef_${i}`][0];
            const descripField = this.$refs[`descripRef_${i}`][0];
            const buttons = this.$refs[this.buttonsDivRef(i)][0].children

            buttons[0].style.display = ""
            buttons[1].style.display = ""
            buttons[2].style.display = "none"
            buttons[3].style.display = "none"

            tittleField.disabled = true
            descripField.disabled = true
            priceField.disabled = true
            stateField.disabled = true

            tittleField.value = ''
            descripField.value = ''
            priceField.value = ''
            stateField.value = ''

        },

        save(i) {
            const stateField = this.$refs[this.stateRef(i)][0]
            const priceField = this.$refs[`priceRef_${i}`][0]
            const tittleField = this.$refs[`tittleRef_${i}`][0];
            const descripField = this.$refs[`descripRef_${i}`][0];

            this.auth.anuncios.value.anuncios[i].tittle = tittleField.value
            this.auth.anuncios.value.anuncios[i].description = descripField.value
            this.auth.anuncios.value.anuncios[i].preco = priceField.value
            this.auth.anuncios.value.anuncios[i].estado = stateField.value

            tittleField.disabled = true
            descripField.disabled = true
            priceField.disabled = true
            stateField.disabled = true

            api.put(`anuncios/${this.auth.anuncios.value.anuncios[i].id}`, {
                data: {
                    tittle: tittleField.value,
                    description: descripField.value,
                    preco: priceField.value,
                    estado: stateField.value
                }
            }, {
                headers: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            }).then(response => console.log(response))

            this.seved(i)
        },
        deleteAd(i) {
            this.auth.deleteAds(this.auth.anuncios.value.anuncios[i].id, i)
            this.deleteAbord(i)
        },
        deleteAbord(i) {

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
    <div v-if="!empty">
        <div v-for="(anuncio, i) in anuncios" :key="i" id="ads">
            <div class="container w-75 position-relative float-start ms-4">
                <div class="row mb-5">


                    <div class="col-6 border">
                        <div class="row justify-content-center mb-3">
                            <div class="col-7">
                                <div class="row">
                                    <div class="container">
                                        <div class="row">
                                            <h5>Título: </h5>
                                        </div>
                                        <div class="row">
                                            <input type="text" class="flex" :placeholder="anuncio.tittle" :disabled="true"
                                                style="width: auto;" :ref="tittleRef(i)">
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div class="col-3">
                                <div class="container">
                                    <h5>Preço:</h5>
                                    <div class="row">
                                        <input type="number" :placeholder="anuncio.preco" :ref="priceRef(i)"
                                            :disabled="true">
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="row justify-content-center">
                            <div class="container">
                                <h5>Descrição:</h5>
                                <div class="row mx-1">
                                    <textarea type="text" style="width: 100%; height: 100%;"
                                        :placeholder="anuncio.description" :disabled="true"
                                        :ref="descriptionRef(i)"></textarea>
                                </div>
                            </div>

                        </div>

                        <div class="row mt-3">
                            <div class="col-3">
                                <h5>Estado:</h5>
                            </div>
                            <div class="col-6">
                                <select id="estadoField" class="form-select mb-3" :disabled="true" :ref="stateRef(i)"
                                    placeholder="Estado" aria-label="Default select example"
                                    :value="auth.anuncios.value.anuncios[i].estado">
                                    <option value="Novo">Novo</option>
                                    <option value="Usado em estado novo">Usado em estado novo</option>
                                    <option value="Usado em boas condições">Usado em boas condições</option>
                                    <option value="Usado em condições razoaveis">Usado em condições razoaveis</option>
                                </select>
                            </div>
                        </div>
                    </div>



                    <div class="col-4 border">
                        <div :id="'slideAnuncio' + i" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div v-for="(photo, j) in anuncio.photos">
                                    <div v-if="j == 0" class="carousel-item active c-item">
                                        <img :src="'http://localhost:1337' + photo.url" class="d-block img-fluid c-img"
                                            alt="...">
                                    </div>
                                    <div v-else class="carousel-item c-item">
                                        <img :src="'http://localhost:1337' + photo.url" class="d-block img-fluid c-img"
                                            alt="...">
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

                        <button class="btn btn-outline-success m-3" @click.prevent="save(i)"
                            style="display: none;">Salvar</button>
                        <button class="btn btn-primary" @click.prevent="saveAbord(i)"
                            style="display: none;">Abortar</button>

                        <button class="btn btn-danger m-3" @click.prevent="deleteAbord(i)"
                            style="display: none;">Abordar</button>
                        <button class="btn btn-danger m-3" @click.prevent="deleteAd(i)"
                            style="display: none;">Confirmar</button>


                    </div>

            </div>

        </div>
    </div>
</div></template>