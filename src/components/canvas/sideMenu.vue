<script setup>
import { ref, reactive, onMounted } from 'vue';

import addAdsForm from '../formulario/addAds.vue'
import { Auth } from "../../stores/auth.js"

const remember = ref(false);


const formRegist = ref({
    username: '',
    email: '',
    password: '',
    passwordConfir: ''
});

const formLogin = ref({
    email: '',
    password: '',
})

const auth = Auth();


function handleImage(event) {
    const file = event.target.files[0];
    data.images = file;
}

function login(){
    auth.login(formLogin.value.email, formLogin.value.password)
    if(!remember.value){
        formLogin.value.email = ''
        formLogin.value.password = ''
    }
}
</script>


<template>
    <!-- Login -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="login" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Login</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container" id="info">
            <form class="float-start" @submit.prevent="login()" >
                <!-- formulario -->
                <div class="form-group">

                    <!-- email -->
                    <input id="eLogin" v-model="formLogin.email" type="email" class="form-control m-3"
                        aria-describedby="emailHelp" placeholder="Email">

                    <!-- Senha -->
                    <input id="pLogin" v-model="formLogin.password" type="password" class="form-control m-3"
                        placeholder="Senha">
                </div>

                <!-- button -->
                <button type="submit" class="btn btn-primary float-start ms-4" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt">Login</button>
                <div class="form-group form-check float-end">

                    <input id="cLogin" type="checkbox" class="form-check-input"  v-model="remember" >
                    <label class="form-check-label" for="cLogin"><small>Lembrar</small></label>
                </div>


            </form>
        </div>
    </div>






    <!-- Register -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="register" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Register</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <!-- formulario -->
        <div class="offcanvas-body container" id="info">
            <form class="float-start"
                @submit.prevent="auth.register(formRegist.username, formRegist.email, formRegist.password)">

                <!-- username -->
                <div class="form-group">
                    <input id="textBox1" v-model="formRegist.username" type="text" class="form-control mx-3 my-3"
                        placeholder="Nome de Usuário">
                </div>

                <!-- email -->
                <div class="form-group">
                    <input id="textBox2" v-model="formRegist.email" type="email" class="form-control mx-3 my-3"
                        aria-describedby="emailHelp" placeholder="Seu email">
                </div>

                <!-- password -->

                <div class="form-group">
                    <input id="textBox3" v-model="formRegist.password" type="password" class="form-control mx-3 my-1"
                        placeholder="Senha">
                </div>
                <div class="form-group">
                    <input id="textBox4" v-model="formRegist.passwordConfir" type="password" class="form-control mx-3 mb-2"
                        placeholder="Confirmar senha">
                </div>


                <!-- end -->
                <button type="submit" class="btn btn-outline-success float-start ms-4">Register</button>
                <!-- <div class="form-group form-check float-end">

                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="exampleCheck1"><small>Login</small></label>
                </div> -->
                <div v-if="auth.regiStat"></div>

            </form>
        </div>
    </div>



    <!-- UserIptions -->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="userOpt" aria-labelledby="loginLabel">

        <div v-if="!auth.logged">
            <div class="offcanvas-header">
                <h5 id="loginLabel">Error</h5>
            </div>

            <div class="offcanvas-body container">
                <div class="form-group">
                    <button type="button" class="btn btn-danger float-start m-3 text-reset" data-bs-toggle="offcanvas"
                        data-bs-target="#login">Tentar novamente</button>
                </div>
            </div>


        </div>

        <div v-else>
            <div v-if="auth.role == 'Admin'">
                <div id="seta"></div>
                <h5 id="loginLabel">AdminOpt</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div v-else class="offcanvas-header">
                <div id="seta"></div>
                <h5 id="loginLabel">UserOpt</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body container">


                <form class="float-start">
                    <!-- opcoes -->
                    <div class="form-group">

                        <button type="button" class="btn btn-primary float-start m-3" data-bs-toggle="offcanvas"
                            data-bs-target="#userAds">Adicionar Anuncios</button>


                        <router-link to="/userAds"><button type="button" data-bs-toggle="offcanvas"
                                class="btn btn-primary float-start m-3" @click="auth.getUserAds()">Gerenciar
                                Anuncios</button></router-link>
                    </div>

                    <button type="button" class="btn btn-danger float-start my-5 ms-3">Configuracoes da Conta</button>
                    <button type="button" class="btn btn-danger float-start my-5 ms-3" @click.prevent="auth.logout()" data-bs-dismiss="offcanvas">Logout</button>


                </form>
            </div>
        </div>
    </div>





    <!-- add Anuncio -->


    <div class="offcanvas offcanvas-end" tabindex="-1" id="userAds" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 class="float-center">Adicionar Anuncios</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container" id="info">
            <addAdsForm />

        </div>
    </div>
</template>