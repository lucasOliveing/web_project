<script setup>
import { ref, reactive, onMounted } from 'vue';

import { api } from "../apiConfig.js";


const token = ref([]);

function Login(email, password) {

    api.post('/auth/local', {
        identifier: email,
        password: password,
    }).then(response => token.value = response)

    return { token };

}


</script>


<template>
    <nav class="navbar navbar-light bg-light mb-4">
        <div class="container-fluid">
            <a class="navbar-brand ms-5">Ads Qxd logo</a>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="seach">
                <button class="btn btn-outline-success" type="button" @click="Search(search)">Search</button>
            </form>

            <div>
                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#login"
                    aria-controls="login">Login</button>

                <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#register">Register</button>
            </div>
        </div>
    </nav>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="login" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Login</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container">
            <form class="float-start" @submit="Login(email, password)">
                <div class="form-group">

                    <input v-model="email" type="email" class="form-control m-3" aria-describedby="emailHelp"
                        placeholder="Email">

                    
                    <input v-model="password" type="password" class="form-control m-3" placeholder="Senha">
                </div>
                <button type="button" class="btn btn-primary float-start ms-4"
                    @click="Login(email, password)">Login</button>
                <div class="form-group form-check float-end">

                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="exampleCheck1"><small>Lembrar</small></label>
                </div>


            </form>
        </div>
    </div>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="register" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Register</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container">
            <form class="float-start">
                <div class="form-group">
                    <!-- <label for="exampleInputEmail1">Endereço de email</label> -->
                    <input type="email" class="form-control mx-3 my-3" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Seu email">
                    <!-- <small id="emailHelp" class="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small> -->


                    <!-- <label for="exampleInputPassword1">Sen</label> -->
                    <input type="password" class="form-control mx-3 my-1" placeholder="Senha">
                    <input type="password" class="form-control mx-3 mb-2" placeholder="Confirmar senha">
                </div>
                <button type="submit" class="btn btn-outline-success float-start ms-4">Register</button>
                <div class="form-group form-check float-end">

                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label" for="exampleCheck1"><small>Login</small></label>
                </div>


            </form>
        </div>
    </div>
   {{ token }}
</template>


