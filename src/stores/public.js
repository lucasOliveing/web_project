import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'



export const publicContent = defineStore('public', {
    state: () => {
        return {
            anuncios: ref([]),
            loaded: false,
            categorias: ref([]),
            cLoaded: false,
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
    },
    getters: {

    }


})