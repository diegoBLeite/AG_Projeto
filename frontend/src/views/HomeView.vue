<template>
  <div>
    <h1>Projetos em Aberto</h1>
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.nome }}</h3>
        <p>Cliente: {{ project.cliente.nome }}</p>
        <router-link :to="`/projects/${project.id}`">Ver Atividades</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      projects: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/projetos/abertos')
      this.projects = response.data
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.project-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}
</style>
