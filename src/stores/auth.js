import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'
import router from '../router/index.js'




export const Auth = defineStore('auth', {
    state: () => {
        return {
            id: '',
            username: '',
            email: '',
            logged: false,
            token: '',
            data: ref([]),
            resonseStatus: 'error',
            anuncios: ref([]),
            role: '',
        }

    },

    actions: {

        logout() {
            this.$reset();
        },
        async login(email, password) {
            try {
                await api.post('/auth/local', {
                    identifier: email,
                    password: password,
                }).then(response => {

                    if (response.status == '200') {

                        this.id = response.data.user.id
                        this.username = response.data.user.username
                        this.email = response.data.user.email
                        this.data = response.data
                        this.token = response.data.jwt
                        this.logged = true

                        api.get("users/me?populate=role", {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },

                        }

                        ).then(response => {
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

            await api.get(`users/${this.id}?populate=anuncios.photos`, {
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

        },


    },


})