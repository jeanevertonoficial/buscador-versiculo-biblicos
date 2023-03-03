<template>
    <div class="container-botoes">
      <button @click="mudaTema">
        {{ textoBotao }}
        <img v-if="modoEscuro" class="img-botoes" src="/assets/img/sol.png" alt="icone modo-escuro">
        <img v-else class="img-botoes" src="/assets/img/lua.png" alt="icone modo-escuro">
      </button>
    </div>
  <main :class="{'modo-claro': modoEscuro}">
    <DashboardCap/>
  </main>
</template>

<script>
import DashboardCap from '@/components/DashboardCap.vue'

export default {
  name: 'App',
  components: {
    DashboardCap
  },
  data() {
    return {
      modoEscuro: true,
    }
  },
  methods: {
    mudaTema() {
      this.modoEscuro = !this.modoEscuro
    },
    verificaModoEscuro() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.modoEscuro = false;
      }
    },
  },
  computed: {
    textoBotao() {
      if (this.modoEscuro) {
        document.querySelector('html').style.background = '#FFF'
        return 'Ativar modo Escuro'
      } else {
        document.querySelector('html').style.background = '#343541'
        return 'Desativar modo escuro'
      }
    },
  },
  mounted() {
    this.verificaModoEscuro();
  }
}
</script>

<style>

main, body, html {
  padding: 0px;
  margin: 0px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.modo-claro {
  --background-padrao-html: var(--color-texto-padrao-escuro);
  --bg-texto-padrao-escuro: #343541;
}

@media (prefers-color-scheme: dark) {
  .modo-claro {
    --background-padrao-html: var(--color-texto-padrao-escuro);
    --bg-texto-padrao-escuro: #343541;
  }
}
</style>