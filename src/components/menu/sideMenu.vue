<script setup>
import { ref } from 'vue';
import { api } from '../../apiConfig';

import addAdsForm from '../formulario/addAds.vue'
import loginForm from '../formulario/login.vue'
import registerForm from '../formulario/register.vue'
import accontConfigForm from '../formulario/acontConfig.vue'

import { Auth } from "../../stores/auth.js"
const auth = Auth();

const errorOpt = ref(null)
const userOpt = ref(null)
const deletedUser = ref()
const deleteUserFail = ref()





function handleImage(event) {
    const file = event.target.files[0];
    data.images = file;
}


async function deleteUser() {
    if (auth.deleteUser() == '200') {
        deletedUser.value.click()
        auth.logout()
    }else{
        deleteUserFail.value.click()
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
            <loginForm />
        </div>
    </div>

    <!-- login error -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="loginError" aria-labelledby="Error">
        <div class="offcanvas-header">
            <h5 id="Error">Error</h5>
        </div>

        <div class="offcanvas-body container">
            <div class="form-group">
                <button type="button" class="btn btn-danger float-start m-3 text-reset" data-bs-toggle="offcanvas"
                    data-bs-target="#login">Tentar novamente</button>
            </div>
        </div>
    </div>




    <!-- deleteConfirm -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="delUserConfirm" aria-labelledby="Error">
        <div class="offcanvas-header">
            <h5 id="Error">Deletar Usurário?</h5>
        </div>

        <div class="offcanvas-body container">
            <div class="form-group">
                <button type="button" class="btn btn-danger" @click="deleteUser()">Confirmar</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- deletado com sucesso -->
    <button class="button" data-bs-toggle="offcanvas" data-bs-target="#deleteUserSucess" ref="deletedUser"
        style="display: none;"></button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="deleteUserSucess" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Deletado com sucesso</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4"
                    data-bs-dismiss="offcanvas">Continuar</button>
            </div>
        </div>
    </div>

    <!--erro ao deletar usuario-->
    <button class="button" data-bs-toggle="offcanvas" data-bs-target="#deleteUserFail" ref="deleteUserFail"
        style="display: none;"></button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="deleteUserSucess" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Falha ao excluir usuário</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4"
                    data-bs-toggle="offcanvas" data-bs-target="#userOpt">Continuar</button>
            </div>
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
            <registerForm />
        </div>
    </div>

    <!-- Register Sucess -->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="registerSucess" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Registrado com Sucesso</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4" data-bs-toggle="offcanvas"
                    data-bs-target="#login">Login</button>
            </div>
        </div>
    </div>


    <!-- updateSucess -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="updateSucess" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Atualizado com Sucesso</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt">Concluir</button>
            </div>
        </div>
    </div>


    <!-- updateFail -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="updateFail" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Falha ao atualizar</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4" data-bs-toggle="offcanvas"
                    data-bs-target="#userConfig">Tentar Novamente</button>
            </div>
        </div>
    </div>

    <!-- Error Register -->


    <div class="offcanvas offcanvas-end" tabindex="-1" id="regisError" aria-labelledby="Error">

        <div class="offcanvas-header">
            <h5 id="Error">Error</h5>
        </div>

        <div class="offcanvas-body container">
            <div class="form-group">
                <button type="button" class="btn btn-danger float-start m-3 text-reset" data-bs-toggle="offcanvas"
                    data-bs-target="#register">Tentar novamente</button>
            </div>
        </div>
    </div>


    <!-- UserIptions -->
    <button class="button" data-bs-toggle="offcanvas" data-bs-target="#userOpt" ref="userOpt"
        style="display: none;"></button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="userOpt" aria-labelledby="Error">


        <div v-if="auth.role == 'Admin'">
            <h5 id="loginLabel">AdminOpt</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div v-else class="offcanvas-header">
            <h5 id="loginLabel">UserOpt</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body container">
            <form class="float-start">
                <!-- opcoes -->
                <div class="form-group">
                    <div v-if="auth.role == 'Admin'">
                        <router-link to='/admin'><button type="button" data-bs-toggle="offcanvas"
                                class="btn btn-primary float-start m-3">Gerenciar</button></router-link>
                    </div>
                    <div v-else>
                        <button type="button" class="btn btn-primary float-start m-3" data-bs-toggle="offcanvas"
                            data-bs-target="#userAds">Adicionar Anuncios</button>
                        <router-link to="/userAds"><button type="button" data-bs-dismiss="offcanvas"
                                class="btn btn-primary float-start m-3" @click="auth.getUserAds()">Gerenciar
                                Anuncios</button></router-link>
                    </div>
                </div>
                <button type="button" class="btn btn-danger float-start my-5 ms-3" data-bs-toggle="offcanvas"
                    data-bs-target="#userConfig">Configuracoes da Conta</button>
                <button type="button" class="btn btn-danger float-start my-5 ms-3" @click.prevent="auth.logout()"
                    data-bs-toggle="offcanvas" data-bs-target="#login">Logout</button>


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
            <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#userOpt">Concluir</button>
        </div>
    </div>


    <!-- Erro ao enviar anuncio -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="sendAdsFail" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Falha ao enviar o anuncio</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body justify-content-center" id="info">
            <div class="row justify-content-center">
                <button type="button" class="btn btn-primary float-start ms-4 col-4" data-bs-toggle="offcanvas"
                    data-bs-target="#userAds">Tentar Novamente</button>
            </div>
        </div>
    </div>

    <!-- configoracoes de conta -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="userConfig" aria-labelledby="loginLabel">
        <div class="offcanvas-header" id="info2">
            <div id="seta"></div>
            <h5 id="loginLabel">Configurações da conta</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body " id="info">
            <accontConfigForm />
        </div>

    </div>
</template>