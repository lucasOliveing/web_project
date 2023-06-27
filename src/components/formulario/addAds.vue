<script>


export default {
    data() {
        return {
            fotos: [],
        }
    },
    methods: {
        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            console.log(files)
            const imgs = []
            let self = this;
            if (files) {
                
                for(let i = 0; i< files.length; i++){
                    const reader = new FileReader
                    reader.addEventListener("load", function (e) {
                        const readerTarget = e.target;

                        const img = document.createElement('img');
                        img.src = readerTarget.result
                        img.classList.add('base-image-input')

                        self.fotos.push(img)
                    })
                    
                    reader.readAsDataURL(files[i])
                    this.$emit('input', files[i])

                }
                console.log(this.fotos)
            }
        },
    }
}


</script>




<template>
    <!--    Formulario para adicionar anuncios -->


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

        <!-- Adicionar Imagens -->
        <!-- <div class="form-group my-1">
            <label class="picture" tabindex="0">
                <input type="file" accept="image/*" class="picture__input">
                
                <span class="picture__image">
                   
                </span>
            </label>
            
        </div> -->

        <div>
            <input multiple  class="d-grid gap-2 d-md-block" ref="fileInput" type="file" @input="onSelectFile">
        </div>



        <div class="container text-center">
        <div class="row align-items-center">
            <div v-if="fotos" v-for="foto in fotos" class="col-6 my-3">
                <img :src="foto.src" alt="" class="img-fluid img-thumbnail" id="tam">
            </div>
        </div>
    </div>




    </form>
</template>

<style>

</style>