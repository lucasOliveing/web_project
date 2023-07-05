<script setup>
import { ref } from 'vue';
import { Auth } from '../../stores/auth';
const regisSucess = ref(null)
const regisError = ref(null)

const auth = Auth()
async function register() {

    await auth.register(formRegist.value.username, formRegist.value.email, formRegist.value.contato, formRegist.value.password)
    if (auth.resonseStatus == '200') {
        regisSucess.value.click()
    } else {
        regisError.value.click()
    }
}
const formRegist = ref({
    username: '',
    email: '',
    contato: '',
    password: '',
});


</script>





<template>
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#registerSucess" ref="regisSucess"
        style="display: none;"> </button>

    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#regisError" ref="regisError"
        style="display: none;">error</button>
    <div>
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


            <button type="submit" class="btn btn-outline-success float-start ms-4">Register</button>

        </form>
    </div>
</template>