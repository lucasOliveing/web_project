import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'
import router from '../router/index.js'




export const Auth = defineStore('auth', {
    state: () => {
        return {
            anuncios: ref([{ anuncios: null }]),
            id: null,
            username: '',
            email: '',
            contato: '',
            logged: false,
            token: '',
            data: ref([]),
            resonseStatus: 'error',
            categorias: ref([]),
            password: null,
            role: '',
            users: ref([])
        }

    },

    actions: {

        logout() {
            this.$reset();
        },
        async getCategorias() {
            await api.get("categorias").then(
                response => { this.categorias.value = response.data.data; })
        },
        async login(email, password) {
            try {
                await api.post('/auth/local?populate=*', {
                    identifier: email,
                    password: password,
                }).then(response => {
                    console.log(response.data.user.id)
                    if (response.status == '200') {

                        this.id = response.data.user.id
                        this.username = response.data.user.username
                        this.email = response.data.user.email
                        this.contato = response.data.user.contato
                        this.data = response.data
                        this.token = response.data.jwt
                        this.logged = true

                        api.get("users/me?populate=role", {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },

                        }

                        ).then(response => {
                            console.log(response)
                            if (response.status == '200') {
                                this.role = response.data.role.name
                                if (this.role == 'Admin') {
                                    router.push('/admin')
                                }

                            } else {
                                console.log("falha ao obter a role do usuario")
                            }

                        })

                        this.resonseStatus = '200'

                    }

                })
            } catch (error) {
                this.resonseStatus = 'error'
            }
        },

        async register(username, email, contato, password) {
            if(contato == ''){
                contato = null
                console.log("sem contato")
            }
            try {
                await api.post('auth/local/register', {
                    username,
                    email,
                    password,
                    contato,
                }).then(response => {
                    if (response.status == '200') {
                        this.resonseStatus = '200'
                    }

                })
            } catch (error) {
                this.resonseStatus = 'error'
            }
        },

        async getUserAds() {
            const self = this
            if (this.role == 'Admin') {
                await api.get(`users/?populate=anuncios.photos&populate=anuncios.user&populate=role&populate=anuncios.categoria`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
                ).then(response => {
                    let anuncios = []
                    if (response.status == '200') {
                        console.log(response.data)
                        this.anuncios.value = response.data
                        console.log(this.anuncios.value)
                        for (let i = 0; i < this.anuncios.value.length; i++) {
                            for (let j = 0; j < this.anuncios.value[i].anuncios.length; j++) {
                                anuncios.push(this.anuncios.value[i].anuncios[j])

                            }
                        }
                        this.anuncios.value.anuncios = anuncios
                        console.log(this.anuncios.value)
                        console.log("sucesso na requisicao dos anuncios dos usuarios como Administrador");
                    } else {
                        console.log("falha na requisicao dos anuncios dos usuario como Admistrador");
                        console.log(response)
                    }
                })
            }
            else {
                await api.get(`users/me?populate=anuncios.photos&populate=anuncios.categoria`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
                ).then(response => {
                    if (response.status == '200') {
                        this.anuncios.value = response.data
                        console.log("sucesso na requisicao dos anuncios do usuario");
                        console.log(response)
                    } else {
                        console.log("falha na requisicao dos anuncios do usuario");
                        console.log(response)
                    }
                })

            }
        },

        deleteAds(adId, index) {
            api.delete(`anuncios/${adId}?populate=photos`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(
                response => {
                    const fotos = response.data.data.attributes.photos.data
                    if (fotos) {
                        for (let i = 0; i < fotos.length; i++) {
                            api.delete(`upload/files/${fotos[i].id}`, {
                                headers: {
                                    Authorization: `Bearer ${this.token}`
                                }
                            }).then(response => {
                                if (response.status == '200') {
                                    console.log("deletado com sucesso")
                                }
                            })
                        }
                    }
                }
            )
            console.log(this.anuncios.value)
            this.anuncios.value.anuncios.splice(index, 1)
        },

        deleteUser() {
            try{
            api.get(`users/me?populate=anuncios&&populate=anuncios.photos`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => {
                const anuncios = response.data.anuncios

                if (anuncios) {
                    for (let i = 0; i < anuncios.length; i++) {
                        this.deleteAds(anuncios[i].id, i)
                    }
                }
            }
            )
            api.delete(`users/me`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(response => console.log(response))

            return '200'
        }catch(error){
            console.log(error)
        }


        }
    },



})
