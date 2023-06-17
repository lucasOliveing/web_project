import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'




export const Auth = defineStore('auth', {
    state: () => {
        return {
            id: '',
            username: '',
            email: '',
            logged: false,
            token: '',
            data: ref([]),
            resonseStatus: '',
            anuncios: ref([])
        }

    },

    actions: {
        async login(email, password) {
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
                    this.resonseStatus = '200'
                } else {
                    console.log(response.data)
                }
            })
        },

        async register(username,email, password){
            await api.post('auth/local/register',{
                username,
                email,
                password
            }).then(response => {
                if(response.status == '200'){
                    this.status = '200'
                    console.log(response.data)
                } else {
                    console.log(response.data)
                }
            })
        },

        getUserAds: async () =>{

            await api.get("users/" + id + "?populate=anuncios", {
                 
                    Authorization: this.token
            }
            ).then(response => {
                if(response.status == '200'){
                this.anuncios.value = response
                    console.log("sucesso na requisicao dos anuncios do usuario")
                }else{
                    console.log("falha na requisicao dos anuncios do usuario");
                    console.log(response)
                }
            })
            
        }


    },

    getters: {
        getToken: (state) => {
            return state.token
        },
        getState: (state) => {
            return state.logged
        },
        getUserName: (state) => {
            return state.username
        }

    }


})