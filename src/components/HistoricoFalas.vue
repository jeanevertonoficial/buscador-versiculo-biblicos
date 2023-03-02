<template>
  <div class="container-box-lateral">
    <div class="box-falas" v-for="(index, item) in historico_falas" :key="index">
      <div class="card-dialogo"
           v-if="index">
        <div class="card-dialogo-texto">
          {{ index }}
        </div>
        <div class="container-icones">
          <div v-if="index" :id="item" class="div-copiar-texto-card" @click="copiarText(index, item)">
            <img src="/assets/img/copy.png" :alt="index">
            <span :id="item" class="span-copiado none">Copiado</span>
          </div>
          <div id="apagar" @click.prevent="delete this.historico_falas[item]">
            <img src="/assets/img/lixobranco.png" :alt="index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import copiarTextoDialogo from "@/controller/copiarTextoDialogos";

export default {
  name: 'historicoFalas',
  props: {historico_falas: String},
  methods: {
    copiarText(e, id) {
      copiarTextoDialogo(e, id)
    }
  }
}
</script>

<style scoped>
.span-excluido, .span-copiado {
  cursor: pointer;
}

.none {
  display: none;
}

.card-dialogo {
  max-width: 241px;
  width: 241px;
  padding: 10px 20px;
  border-radius: 12px;
  background: var(--bg-texto-padrao-escuro);
  box-shadow: inset 0px -20px 20px 0px #0000004a;
  color: #c9cdd4;
  max-height: 100px;
  height: 85px;
  text-align: start;
  margin-bottom: 15px;
  transition: 0.5ms;
}

.card-dialogo-texto {
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3ms;
  height: 60px;
}
.card-dialogo-texto:hover {
  transition: all 0.7ms;
  overflow: auto;
  white-space: break-spaces;
}
.container-icones {
  display: flex;
  justify-content: space-between;
}
</style>