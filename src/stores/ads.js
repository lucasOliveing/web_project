import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'



export const Ads = defineStore('Ads', {
    state: () => {
        return {
            anuncios: ref([]),
            userAnuncios: ref([]),
            adminAnuncios: ref([]),
            categoryAds: ref([]),
            categoryEmpty: true,
            categoryId: null,
            loaded: false,
            categorias: ref([]),
            catLoaded: false,
            categoryAdsButton: false,
            updateState: '',
            categoryAdss: []
        }
    },

    actions: {

        getCategories() {
            api.get("categorias").then(
                response => { this.categorias.value = response.data.data; })
        },

        async getUsersCategoryAds(id) {
            if (this.categoryAdsButton && this.categoryId == id) {
                this.categoryAdsButton = false
            } else {
                this.categoryAds = ref([]),
                this.categoryAdsButton = true
                this.categoryId = id

                var ads = await api.get(`categorias/${id}?populate=anuncios&populate=anuncios.photos`)
                ads = ads.data.data.attributes.anuncios.data

                // if(ads.length)
                // console.log(ads)
                for (var i = 0; i < ads.length; i++) {
                    var photos = ads[i].attributes.photos.data
                    this.categoryAds.push(ads[i].attributes)
                    this.categoryAds[i].id = ads[i].id
                    this.categoryAds[i].photos = []
                    if(photos)
                    for (let j = 0; j < photos.length; j++) {
                        this.categoryAds[i].photos.push(photos[j].attributes)
                        this.categoryAds[i].photos[j].id = photos[j].id
                    }

                }

                for (let i = 0; i < this.categoryAds.length; i++)
                    Object.assign(this.categoryAds[i], { configOpt: { optDiv: true, editDiv: false, deleteDiv: false, disabled: true }, show: true })
                // console.log(photos)
                // console.log(this.categoryAds)
                // else
                // console.log('vazio')
                // this.categoryAds.value.push
            }
            if(!this.categoryAds.length)
                this.categoryEmpty = true
            else
                this.categoryEmpty = false

        },

        getAllUsersAds() {
            api.get(`users/?populate=anuncios.photos&populate=anuncios.categoria`
            ).then(response => {
                let anuncios = []
                if (response.status == '200') {
                    this.userAnuncios.value = response.data
                    for (let i = 0; i < this.userAnuncios.value.length; i++) {
                        for (let j = 0; j < this.userAnuncios.value[i].anuncios.length; j++) {
                            anuncios.push(this.userAnuncios.value[i].anuncios[j])
                        }
                    }

                    for (let i = 0; i < anuncios.length; i++)
                        Object.assign(anuncios[i], { configOpt: { optDiv: true, editDiv: false, deleteDiv: false, disabled: true }, show: true })
                    this.userAnuncios.value = anuncios

                } else {
                }
            })

        },

        getUserAds(id) {
            api.get(`users/${id}?populate=anuncios.photos&populate=anuncios.categoria`,
            ).then(response => {
                if (response.status == '200') {
                    this.userAnuncios.value = response.data.anuncios

                    for (let i = 0; i < this.userAnuncios.value.length; i++)
                        Object.assign(this.userAnuncios.value[i], { configOpt: { optDiv: true, editDiv: false, deleteDiv: false, disabled: true }, show: true })

                    console.log(this.userAnuncios.value)
                    console.log("sucesso na requisicao dos anuncios do usuario");
                } else {
                    console.log("falha na requisicao dos anuncios do usuario");
                }
            })


        },
        async uploadImages(images, imageNames, token) {
            var imageId = null
            const arrayFotos = []

            for (let i = 0; i < images.length; i++) {
                arrayFotos.push(await fetch(images[i].src).then(response => response.blob()))
            }
            const formData = new FormData();
            for (let i = 0; i < arrayFotos.length; i++) {
                formData.append('files', arrayFotos[i], imageNames[i])
            }


            return api.post('/upload/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }).then(response => {
                imageId = response.data.map(item => item.id)
                console.log(response)
                return imageId
            }).catch(erro => { return erro })



        },
        deleteImages(id, token) {
            return api.delete(`upload/files/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response)
                if (response.status == '200') {
                    return 200
                } else {
                    return response
                }
            })
        },

        async getCategoryAds(id, user = false) {
            if (this.categoryAdsButton && this.categoryId == id) {
                this.categoryAdsButton = false
                this.getAds()
            } else {
                this.categoryAdsButton = true
                this.categoryId = id
                // this.categoryAds = ref([])
                api.get(`categorias/${id}?populate=anuncios&populate=anuncios.photos`).then(response => {
                    if (response.data.data.attributes.anuncios.data.length > 0) {

                        this.categoryAds.value = response.data.data.attributes.anuncios.data
                        // console.log(this.categoryAds.value)
                        this.categoryEmpty = false
                        /* if (user) {
                            // console.log(this.categoryAds.value)
                            var anuncios = []
                            var photos = []
                            for (var i = 0; i < this.categoryAds.value.length; i++) {
                                anuncios.push(this.categoryAds.value[i].attributes)

                                console.log(anuncios)
                                if (anuncios.photos) {
                                    for (var j = 0; j < anuncios[i].photos.data.length; j++) {
                                        photos.push(anuncios[i].photos.data[j].attributes)
                                    }

                                    console.log(photos)
                                    photos = []
                                }
                                anuncios[i].photos = photos
                            }

                            //precisando formatar os dados para conseguir exibir
                            for (let i = 0; i < anuncios.length; i++)
                                Object.assign(anuncios[i], { configOpt: { optDiv: true, editDiv: false, deleteDiv: false, disabled: true }, show: true })
                            this.categoryAds.value = anuncios

                        } */
                    } else
                        // this.categoryAds = null
                        this.categoryEmpty = true
                })
            }
        },



        // CRUD dos Anuncios
        createAd(fields, authorization) {
            return api.post('anuncios/', fields, authorization).then(response => { return response })
        },
        getAds() {
            api.get("anuncios?populate=*&pagination[pageSize]=5").then(
                response => { this.anuncios.value = response.data.data; })
        },
        updateAd(id, token, fields) {
            return api.put(`anuncios/${id}`, { data: fields }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response)
                return response
            }
            ).catch(erro => { return erro })

        },
        deleteAd(id, token) {
            return api.delete(`anuncios/${id}?populate=photos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                response => {
                    const fotos = response.data.data.attributes.photos.data
                    if (fotos) {
                        for (let i = 0; i < fotos.length; i++) {
                            console.log(this.deleteImages(fotos[i].id, token))
                        }
                    }
                    return response
                }
            ).catch(erro => { return erro })

        },

    },







})