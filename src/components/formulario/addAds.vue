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


        <button @click.prevent="uploadingFotos()">enviar</button>

        <div class="container text-center">
            <div class="row align-items-center">
                <div v-if="fotos" v-for="foto in fotos" class="col-6 my-3">
                    <img :src="foto.src" alt="" class="img-fluid img-thumbnail" id="tam">
                </div>
            </div>
        </div>




    </form>
</template>

<style></style>