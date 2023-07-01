<script>
import axios from 'axios'
import { Auth } from "../../stores/auth.js"

export default {
    data() {
        return {
            fotos: [],
            input: null,
            auth: Auth(),
            tittle: '',
            description: '',
        }
    },
    methods: {
        onSelectFile() {
            this.input = this.$refs.fileInput
            const files = this.input.files

            console.log(this.tittle)
            console.log(this.description)
            const imgs = []
            let self = this;
            if (files) {

                for (let i = 0; i < files.length; i++) {
                    const reader = new FileReader
                    reader.addEventListener("load", function (e) {
                        const readerTarget = e.target;

                        const img = document.createElement('img');
                        img.src = readerTarget.result
                        // img.classList.add('base-image-input')

                        self.fotos.push(img)
                    })

                    reader.readAsDataURL(files[i])
                    this.$emit('input', files[i])
                }
            }
        },

        async uploadingFotos() {
            const files = this.input.files

            console.log(files)

            let self = this
            const arrayFotos = []
            for (let i = 0; i < self.fotos.length; i++) {
                arrayFotos.push(await fetch(self.fotos[i].src).then(response => response.blob()))
            }



            const formData = new FormData();
            for (let i = 0; i < arrayFotos.length; i++) {
                formData.append('files', arrayFotos[i], files[i].name)
            }


            await axios.post('http://localhost:1337/api/upload/', formData, {
                headers: {
                    Authorization: `Bearer ${self.auth.token}`,
                },

            }).then(response => {
                const imageId = response.data.map(item => item.id)
                // console.log(imageId)
                axios.post('http://localhost:1337/api/anuncios/', {

                    user: self.auth.id,
                    data: {
                        tittle: self.tittle,
                        description: self.description,
                        user: self.auth.id,
                        photos: imageId
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${self.auth.token}`,
                    },

                }).then(response => console.log(response))
            })
        },

        deletar(i){
                this.fotos.pop(i)
            }
    }
}
</script>

<template>
    <!--    Formulario para adicionar anuncios -->


    <form>

        <!-- Titulo  -->
        <div class="form-group mb-3 ">
            <label for="titulo" class="float-start">
                <h5>Título</h5>
            </label>
            <input type="text" class="form-control" id="titulo" v-model="tittle">
        </div>

        <!-- Descrição -->
        <div class="form-group mb-3">
            <label for="exampleFormControlTextarea1" class="float-start">
                <h5>Descrição</h5>
            </label>
            <textarea class="form-control" type="text" id="exampleFormControlTextarea1" rows="3"
                v-model="description"></textarea>
        </div>


        <!-- Condicao -->
        <div class="container mb-4">
                <h5>Estado</h5>
            <div class="border p-3" id="condition">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="RadioOptions" id="Radio1" value="opcao1">
                    <label class="form-check-label float-start" for="Radio1">Novo</label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="RadioOptions" id="Radio2" value="opcao2">
                    <label class="form-check-label float-start" for="Radio2">Usado em estado novo</label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="RadioOptions" id="Radio3" value="opcao3">
                    <label class="form-check-label float-start" for="Radio3">Usado em boas condicoes</label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="RadioOptions" id="Radio4" value="opcao3">
                    <label class="form-check-label float-start" for="Radio4">Usado em condiçoes razoaveis</label>
                </div>
            </div>
        </div>


        <div>
            <input multiple class="d-grid gap-2 d-md-block" ref="fileInput" type="file" @input="onSelectFile">
        </div>

        


        <button class="btn btn-outline-secondary" @click.prevent="uploadingFotos()">Enviar</button>

        <div class="container text-center">
            <div class="row align-items-center">
                <div v-if="fotos" v-for="(foto, i) in fotos" class="col-6 my-3" :key="i">
                    <img :src="foto.src" alt="" class="img-fluid img-thumbnail" id="tam">
                    <button class="btn" @click.prevent="deletar(i)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button>
                </div>
            </div>
        </div>




    </form>
</template>

<style></style>