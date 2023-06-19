<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Auth } from "../stores/auth.js"
import { api } from "../apiConfig.js";

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

const data = ref({
    titulo: '',
    desccricao: '',
    images: null

})

const auth = Auth();


function handleImage(event) {
    const file = event.target.files[0];
    data.images = file;
}
</script>


<template>
    <nav class="navbar navbar-light bg-light mb-4" id="navbar">
        <div class="container-fluid">


            <a class="navbar-brand ms-5">Ads Qxd logo</a>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="button" @click="Search(search)">Search</button>
            </form>

            <div v-if="!auth.logged">
                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#login"
                    aria-controls="login">Login</button>

                <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#register">Register</button>
            </div>


            <div v-else><button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt" aria-controls="login">User</button></div>
        </div>
    </nav>









    <!-- Login -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="login" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Login</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container">
            <form class="float-start" @submit.prevent="auth.login(formLogin.email, formLogin.password)">
                
                
                <!-- formulario -->
                <div class="form-group">

                    <!-- email -->
                    <input v-model="formLogin.email" type="email" class="form-control m-3" aria-describedby="emailHelp"
                        placeholder="Email">

                    <!-- Senha -->
                    <input v-model="formLogin.password" type="password" class="form-control m-3" placeholder="Senha">
                </div>

                        <!-- button -->
                <button type="submit" class="btn btn-primary float-start ms-4" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt">Login</button>
                <div class="form-group form-check float-end">

                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="exampleCheck1"><small>Lembrar</small></label>
                </div>


            </form>
        </div>
    </div>






    <!-- Register -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="register" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Register</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
                        <!-- formulario -->
        <div class="offcanvas-body container">
            <form class="float-start" @submit.prevent="auth.register(formRegist.username,formRegist.email, formRegist.password)">

                <!-- username -->
                <div class="form-group">
                    <input v-model="formRegist.username" type="text" class="form-control mx-3 my-3" placeholder="Nome de Usuário">
                </div>
                
                <!-- email -->
                <div class="form-group">
                    <input v-model="formRegist.email" type="email" class="form-control mx-3 my-3" aria-describedby="emailHelp" placeholder="Seu email">
                </div>

                <!-- password -->
                
                <div class="form-group">
                    <input v-model="formRegist.password" type="password" class="form-control mx-3 my-1" placeholder="Senha">
                </div>
                <div class="form-group">
                    <input v-model="formRegist.passwordConfir" type="password" class="form-control mx-3 mb-2" placeholder="Confirmar senha">
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
            <div class="offcanvas-header">
                <h5 id="loginLabel">UserOpt</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body container">


                <form class="float-start"  @submit.prevent="auth.getUserAds()">
                        <!-- opcoes -->
                    <div class="form-group">
                       
                        <button type="button" class="btn btn-primary float-start m-3" data-bs-toggle="offcanvas"
                            data-bs-target="#userAds">Adicionar Anuncios</button>

                        <button type="submit" class="btn btn-primary float-start m-3">Gerenciar Anuncios</button>

                    </div>

                    <button type="button" class="btn btn-danger float-start my-5 ms-3">Configuracoes da Conta</button>

                </form>
            </div>
        </div>
    </div>





    <!-- add Anuncio -->


    <div class="offcanvas offcanvas-end" tabindex="-1" id="userAds" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 class="float-center">Adicioar Anuncios</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container">


            <!-- Formularios -->
            <form>

                <!-- Titulo  -->
                <div class="form-group mb-3 ">
                    <label for="#titulo" class="float-start">
                        <h5>Título</h5>
                    </label>
                    <input type="text" class="form-control" id="titulo">
                </div>

                <!-- Descrição -->
                <div class="form-group mb-3">
                    <label for="exampleFormControlTextarea1" class="float-start">
                        <h5>Descrição</h5>
                    </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>


                <!-- Condicao -->
                <div class="container mb-4">
                    <label for="#condition">
                        <h5>Estado</h5>
                    </label>
                    <div class="border p-3" id="condition">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="RadioOptions" id="Radio1"
                                value="opcao1">
                            <label class="form-check-label float-start" for="Radio1">Novo</label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="RadioOptions" id="Radio2"
                                value="opcao2">
                            <label class="form-check-label float-start" for="Radio2">Usado em estado novo</label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="RadioOptions" id="Radio3"
                                value="opcao3">
                            <label class="form-check-label float-start" for="Radio3">Usado em boas condicoes</label>
                        </div>
                        <div class="form-check ">
                            <input class="form-check-input" type="radio"  name="RadioOptions" id="Radio4"
                                value="opcao3">
                            <label class="form-check-label float-start" for="Radio4">Usado em condiçoes razoaveis</label>
                        </div>
                    </div>
                </div>

                <!-- Adicionar Imagens -->
                <div class="form-group my-1">
                    <label for="imageFild" class="float-start" @change="handleImag">
                        <h5>Adicionar Imagens</h5>
                    </label>
                    <input id="imageFiel" type="file" class="float-start" @change="handleImageChange">
                </div>




            </form>
        </div>
    </div>

    {{ formLogin }}
    {{ auth.logged }}
    {{ auth.token }}
    <h5>User ID: {{ auth.id }}</h5>
    <h1>anuncios do usuario</h1>
    {{ auth.anuncios.value}}

</template>


