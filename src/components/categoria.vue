<script>
import { defineComponent, onMounted, ref } from "vue";
import { api } from "../apiConfig.js";


export default defineComponent({
  name: "categories",
  setup() {
    const categorias = ref([]);

    const getCategorias = () => api.get("categorias").then(
      response => {  categorias.value = response.data.data; })

    onMounted(getCategorias);

    return { categorias };
  },
});
</script>

<template>
    <div class="container w-25  position-fixed end-0">
        <!-- <p>{{ categorias }}</p> -->
        <div class="container-fluid">
            <h1>Category</h1>
            <div class=" border">
            <h5 v-for="(categoria, i) in categorias" class="c-h5">{{ categoria.attributes.name }}</h5>
        </div>
    </div>
    </div>

</template>