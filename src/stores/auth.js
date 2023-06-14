import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../apiConfig.js'


/* export const auth = defineStore('auth', () => {
    const token = ref([])
    const logged = false

    function login(){

    }


}) */


export const Auth = defineStore('auth', {
    state: () => {
        return {
            logged: false,
            token: '',
            data: ref([]),
        }

    },

    actions: {
        async login(email, password) {
            await api.post('/auth/local', {
                identifier: email,
                password: password,
            }).then(response => {
                if(response.status == '200')
                {
                    this.data = response.data
                    this.token = response.data.jwt
                    this.logged = true
                }else{
                    console.log(response.data)            
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
        getUser: (state) => {

        }
    }


})