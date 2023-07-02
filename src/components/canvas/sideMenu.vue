<script setup>
import { ref, reactive, onMounted } from 'vue';

import addAdsForm from '../formulario/addAds.vue'
import { Auth } from "../../stores/auth.js"

const remember = ref(false);
const formError = ref(null)
const errorOpt = ref(null)
const userOpt = ref(null)
const regisSucess = ref(null)

function formErr() {
    errorOpt.value.click()
}
const formRegist = ref({
    username: '',
    email: '',
    contato: '',
    password: '',
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

async function login() {
    await auth.login(formLogin.value.email, formLogin.value.password)
    console.log(auth.resonseStatus)

    if (auth.resonseStatus == '200') {
        if (!remember.value) {
            formLogin.value.email = ''
            formLogin.value.password = ''
        }
        userOpt.value.click()
    } else {
        formError.value = '#login'
        formErr()
    }
}

async function register() {

    await auth.register(formRegist.value.username, formRegist.value.email, formRegist.value.contato, formRegist.value.password)
    if (auth.resonseStatus == '200') {
        regisSucess.value.click()
    } else {
        formError.value = '#register'
        formErr()
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
            <form class="float-start" @submit.prevent="login()">
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
                <button type="submit" class="btn btn-primary float-start ms-4">Login</button>
                <div class="form-group form-check float-end">

                    <input id="cLogin" type="checkbox" class="form-check-input" v-model="remember">
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
            <form class="float-start" @submit.prevent="register()">

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

                <div class="form-group mb-3">
                    <input id="textBox3" v-model="formRegist.contato" type="tel" class="form-control mx-3 my-1"
                        placeholder="Contato">
                </div>
                <div class="form-group">
                    <input id="textBox4" v-model="formRegist.password" type="password" class="form-control mx-3 mb-2"
                        placeholder="Senha">
                </div>

                {{ formRegist.username }}
                {{ formRegist.email }}
                {{ formRegist.contato }}
                {{ formRegist.password }}
                <!-- end -->
                <button type="submit" class="btn btn-outline-success float-start ms-4">Register</button>

            </form>
        </div>
    </div>

    <!-- Register Sucess -->
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#registerSucess" ref="regisSucess" style="display: none;"> </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="registerSucess" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Registrado com Sucesso</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
            <button type="button" class="btn btn-primary float-start ms-4 col-4" data-bs-toggle="offcanvas" data-bs-target="#login">Login</button>
        </div>
    </div>
    </div>

    <!-- Error Login/Register -->

    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#formError" ref="errorOpt" style="display: none;">error</button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="formError" aria-labelledby="Error">

        <div class="offcanvas-header">
            <h5 id="Error">Error</h5>
        </div>

        <div class="offcanvas-body container">
            <div class="form-group">
                <button type="button" class="btn btn-danger float-start m-3 text-reset" data-bs-toggle="offcanvas"
                    :data-bs-target="formError">Tentar novamente</button>
            </div>
        </div>
    </div>


    <!-- UserIptions -->
    <button class="button" data-bs-toggle="offcanvas" data-bs-target="#userOpt" ref="userOpt" style="display: none;"></button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="userOpt" aria-labelledby="Error">


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
                <button type="button" class="btn btn-danger float-start my-5 ms-3" @click.prevent="auth.logout()"
                    data-bs-dismiss="offcanvas">Logout</button>


            </form>
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


    <!-- anuncio adicionado -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="adsSend" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 class="float-center">Anuncio Adicionado</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container" id="info">
            <button type="button" class="btn btn-primary" data-bs-dismiss="offcanvas" >Concluir</button>
        </div>
    </div>
</template>