<template>
    <div class="container-box-lateral">
        <div class="box-falas" v-for="(index, historico) in historico_falas" :key="index">
           <p>{{ historico }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'historicoFalas',
    props: [ historico_falas ]
}
</script>

<style scoped>
.container-box-lateral {
    background-color: black;
    height: 100%;
    width: 250px;
}
</style>