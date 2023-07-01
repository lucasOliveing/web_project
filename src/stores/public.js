import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'



export const publicContent = defineStore('public', {
    state: () => {
        return {
            anuncios: ref([]),
            categoryAds: ref([]),
            categoryId: null,
            loaded: false,
            categorias: ref([]),
            catLoaded: false,
            categoryAdsButton: false,

        }
    },

    actions: {
        async getAds() {
            await api.get("anuncios?populate=*").then(
                response => { this.anuncios.value = response.data.data; })
        },

        async getCategorias() {
            await api.get("categorias").then(
                response => { this.categorias.value = response.data.data; })
        },
        async getCategoryAds(id) {
            if (this.categoryAdsButton && this.categoryId == id) {
                this.categoryAdsButton = false
            } else {
                this.categoryAdsButton = true
                this.categoryId = id
                await api.get(`categorias/${id}?populate=anuncios&populate=anuncios.photos`).then(response => {
                    this.categoryAds.value = response.data.data.attributes.anuncios.data
                    console.log(this.categoryAds.value)
                })
            }


        }
    },



})