<script setup>
import router from '../router/index.js'
import sideMenu from './canvas/sideMenu.vue'
import { Auth } from "../stores/auth.js"

const auth = Auth();
</script>


<template>
    <sideMenu/>

    <nav class="navbar navbar-light bg-light mb-4" id="navbar">
        <div class="container-fluid">


            <button class="btn" @click="router.push('/main')">Ads Qxd</button>
            <form class="d-flex">
                <input  id="textBox" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="button" @click="Search(search)">Search</button>
            </form>

            <div v-if="!auth.logged">
                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#login"
                    aria-controls="login">Login</button>

                <button class="btn btn-outline-success" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#register">Register</button>
            </div>


            <div v-else>
                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#userOpt" aria-controls="login">User</button></div>
        </div>
    </nav>








    
<!-- 
    {{ formLogin }}
    {{ auth.logged }}
    {{ auth.token }}
    <h5>User ID: {{ auth.id }}</h5> -->
</template>


