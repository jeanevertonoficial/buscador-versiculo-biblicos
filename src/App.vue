<template>
  <DashboardCap/>
</template>

<script>
import DashboardCap from '@/components/DashboardCap.vue'

export default {
  name: 'App',
  components: {
    DashboardCap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--background-padrao-html);
}
</style>
