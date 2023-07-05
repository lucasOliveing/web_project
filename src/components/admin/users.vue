<script>
import { Auth } from '../../stores/auth';
import { ref } from 'vue'
import sideMenu from '../menu/sideMenu.vue';
import userForm from '../formulario/acontConfig.vue'


export default {
    components : {
        sideMenu
    },
    data() {
        return {
            auth: Auth(),
            editOn: false
        }
    },

    methods: {
        save(i) {
            return `saveRef_${i}`
        },
        deleteUser(i){
            console.log('here')
            this.$refs[this.deleteOptRef(i)].style = 'none'
        },
        editRef(i) {
            return `editRef_${i}`
        },
        optRef(i) {
            return `optRef_${i}`
        },
        deleteOptRef(i){
            return `deleteOptRef_${i}`
        },
        deleteOpt(i){
            this.$refs[this.deleteOptRef(i)][0].style = ''
        },
        deleteOptOff(i){
            this.$refs[this.deleteOptRef(i)][0].style = 'none'
        },
        edit(i) {
            this.$refs[this.optRef(i)][0].style.display =  '' 
        },
        editOf(i) {
            console.log("here")
            this.$refs[this.optRef(i)][0].style.display = 'none'
        }
    }
}
</script>

<template>
    <div class="container-fluid mb-5">
        <h5 class="position-relative float-start mt-2">Usuários</h5>
        <button type="button mr-4" class="btn position-relative float-center" data-bs-toggle="offcanvas"
            data-bs-target="#register">Registrar Usuário</button>
        <button type="button" class="btn position-relative float-end" id="adm"><router-link
                to="/main">voltar</router-link></button>
    </div>
    <sideMenu />

    <div class="container">
        <div v-for="(user, i) in auth.anuncios.value" :key="i">
            <div class="row mb-4" v-if="user.role.name != 'Admin'">
                <class class="col-3">
                    <button class="btn btn-primary" style="width: 50%;" @click="edit(i)">Editar</button>
                </class>

                <class class="col-3">

                    <div class="container-fluid">
                        <button class="btn" style="width: 100%;">

                            <div class="row">
                                <h5>{{ user.username }}</h5>
                            </div>
                        </button>

                    </div>

                </class>
                <class class="col-3">
                    <h5>{{ user.role.name }}</h5>
                </class>

                <class class="col-3">
                    <button class="btn btn-danger" @click="deleteOpt(i)">Deletar</button>
                </class>

                <div class="container" style="display: none" :ref="deleteOptRef(i)">
                    <div class="row">
                        <button type="button" class="btn" @click="deleteUser(i)">Confirmar</button>
                        <button type="button" class="btn" @click="deleteOptOff(i)">Cancelar</button>
                    </div>
                </div>

                <div class="container" style="display: none" :ref="optRef(i)">
                    <form @submit.prevent="editOf(i)" class="float-start">
                        <div class="mb-3">
                            <h5>Atualizar Dados</h5>
                        </div>
                        <div class="container border align-text-itens" id="atualizarDados">
                            <div class="row my-2">
                                <label>Nome de Usuário</label>
                                <input type="text" class="form-control mb-3 mx-2" v-model="auth.username">
                            </div>
                            <div class="row">
                                <label>Email</label>
                                <input type="text" v-model="auth.email" class="form-control mb-3 mx-2">
                            </div>
                            <div class="row">
                                <label>Contato</label>
                                <input type="text" v-model="auth.contato" class="form-control mb-3 mx-2">
                            </div>
                            <div class="row">
                                <label>Senha</label>
                                <input type="password" class="form-control mb-3 mx-2">
                            </div>
                            <div class="" style="text-align: center;">
                                <button type="submit" class="btn btn-primary mt-3 mb-2" :ref="save(i)">salvar</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>

    </div>
</template>