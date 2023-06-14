<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Auth } from "../stores/auth.js"
import { api } from "../apiConfig.js";

const form = ref({
    email: '',
    password: ''
});

const auth = Auth();


</script>


<template>
    <nav class="navbar navbar-light bg-light mb-4">
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
            <div v-else><button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#login"
                    aria-controls="login">UserOptions</button></div>
        </div>
    </nav>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="login" aria-labelledby="loginLabel">
        <div class="offcanvas-header">
            <h5 id="loginLabel">Login</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container">
            <form class="float-start" @submit.prevent="auth.login(form.email, form.password)">
                <div class="form-group">

                    <input v-model="form.email" type="email" class="form-control m-3" aria-describedby="emailHelp"
                        placeholder="Email">

                    
                    <input v-model="form.password" type="password" class="form-control m-3" placeholder="Senha">
                </div>
                <button type="submit" class="btn btn-primary float-start ms-4">Login</button>
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
                    <input type="email" class="form-control mx-3 my-3" aria-describedby="emailHelp"
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
    {{ form }}
   {{ auth.logged }}
</template>


