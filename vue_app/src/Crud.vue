<template>
    {{ apiLog }} <br>
    <items ref="mydocuments" :items="documents" v-slot="{ item }">
        <input placeholder="title" size="5" type="text" v-model="item.data.nome">
        <img :src="`http://localhost:3000/${item.data.conteudo}`" alt="Conteudo">
        <!-- <input type="file" v-if="item.data" @change="handleFileUpload($event, item)"> -->
        <button @click="save(item)">save</button>
        <button @click="savePut(item)">save(PUT)</button>
        <button @click="del(item)">delete</button>
    </items>
    <button @click="$refs.mydocuments.addNew({})">+Add New</button>
</template>
  
<script>

import items from '@benixal/vue-items'
import axios from 'axios'
export default {
    name: 'App',
    components: {
        items
    }, mounted() {
        axios.get("http://localhost:3000/documentos")
            .then(response => (this.documents = response.data))
    }, methods: {
        save(item) {
            if (!Object.keys(item.data).includes("id")) {
                const formData = new FormData();
                formData.append("nome", item.data.nome);
                formData.append("conteudo", item.data.conteudo);

                axios.post("http://localhost:3000/documentos", formData)
                    .then((response) => {
                        item.data.id = response.data.id;
                        this.apiLog = response.data;
                    })
            } else {
                axios.patch("http://localhost:3000/documentos/" + item.data.id,
                    item.data
                )
                    .then((response) => {
                        this.apiLog = response.data;
                    })
            }
        },
        savePut(item) {
            axios.put("http://localhost:3000/documentos/" + item.data.id,
                { id: item.data.id, name: item.data.title }
            )
                .then((response) => {
                    this.apiLog = response.data;
                })
        }
        , del(item) {
            axios.delete("http://localhost:3000/documentos/" + item.data.id)
                .then((response) => {
                    item.destroy();
                    this.apiLog = response.data;
                })
        }
    },
    data() {
        return {
            apiLog: null,
            documents: []
        }
    },
}
</script>
  
<style>
button,
input {
    margin: 0.1rem
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
  