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

        <div class="base-image-input">
            <input multiple class="file-input" ref="fileInput" type="file" @input="onSelectFile">
        </div>

        <div v-if="fotos" v-for="foto in fotos">
            <img :src="foto.src" alt="">
        </div>




    </form>
</template>

<style>
.base-image-input {
    display: block;
    width: 200px;
    aspect-ratio: 16/9;
    /* cursor: pointer; */
    background-size: cover;
    background-position: center center;
}

.placeholder {
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
}

.placeholder:hover {
    background: #E0E0E0;
}

/* .file-input {
    display: none;
} */


/* aqui era do codigo antigo */
.picture__input {
    display: none;
}

.picture {
    width: 200px;
    aspect-ratio: 16/9;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border: 2px dashed;
    cursor: pointer;
    font-family: sans-serif;
    transition: color 300ms ease-in-out, background 300ms ease-in-out;
    outline: none;
}

.picture:hover {
    color: #777;
    background: #ccc;
}

.picture:active {
    color: green;
    /* background: #eee; */
}

.picture:focus {
    color: #777;
    background: #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.picture__img {
    max-width: 100%;
}
</style>