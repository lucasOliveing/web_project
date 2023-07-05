<script setup>
import { Auth } from '../../stores/auth';

import router from '../../router';
const auth = Auth();



</script>



<template>
    <nav class="navbar navbar-light bg-light mb-4" id="navbar">
        <div class="container-fluid">


            <button class="btn" @click="router.push('/admin/ads')">Ads Qxd</button>
            <form class="d-flex">
                <input id="textBox" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="button" @click="Search(search)">Search</button>
            </form>

            


            
        </div>
    </nav>
</template>