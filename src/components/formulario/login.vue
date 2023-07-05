<script setup>
import { ref } from 'vue';
import { Auth } from '../../stores/auth';
const auth = Auth()

const loginSucess = ref(null)
const loginError = ref(null)

async function login() {
    await auth.login(formLogin.value.email, formLogin.value.password)
    console.log(auth.resonseStatus)

    if (auth.resonseStatus == '200') {
        if (!remember.value) {
            formLogin.value.email = ''
            formLogin.value.password = ''
        }
        if (auth.role == 'Admin') {
            auth.getUserAds()
        }
        loginSucess.value.click()
    } else {
        loginError.value.click()
    }
}
const formLogin = ref({
    email: '',
    password: '',
})
const remember = ref(false);



</script>


<template>
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#userOpt" ref="loginSucess"
        style="display: none;"> </button>
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#loginError" ref="loginError"
        style="display: none;"> </button>

    <form class="float-start" @submit.prevent="login()">
        <!-- formulario -->
        <div class="form-group">

            <!-- email -->
            <input id="eLogin" v-model="formLogin.email" type="text" class="form-control m-3" aria-describedby="emailHelp"
                placeholder="Email">

            <!-- Senha -->
            <input id="pLogin" v-model="formLogin.password" type="password" class="form-control m-3" placeholder="Senha">
        </div>

        <!-- button -->
        <button type="submit" class="btn btn-primary float-start ms-4" data-bs-dismiss="offcanvas">Login</button>
        <div class="form-group form-check float-end">

            <input id="cLogin" type="checkbox" class="form-check-input" v-model="remember">
            <label class="form-check-label" for="cLogin"><small>Lembrar</small></label>
        </div>


    </form>
</template>