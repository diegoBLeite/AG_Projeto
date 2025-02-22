<template>
  <div class="project-list">
    <div v-if="loading" class="loading">
      Carregando projetos...
    </div>

    <div v-else-if="error" class="error">
      Erro ao carregar projetos: {{ error }}
    </div>

    <div v-else>
      <div v-if="projects.length === 0" class="empty-state">
        Nenhum projeto encontrado
      </div>

      <div v-for="project in projects"
           :key="project.id"
           class="project-card"
           @click="selectProject(project.id)">
        <div class="card-header">
          <h3 class="project-name">{{ project.nome }}</h3>
          <span class="project-status" :class="statusClass(project.status)">
            {{ project.status }}
          </span>
        </div>

        <div class="card-body">
          <p class="client-info">
            <span class="label">Cliente:</span>
            {{ project.cliente?.nome || 'Não informado' }}
          </p>
          <div class="meta-info">
            <span class="date">
              <i class="fas fa-calendar-alt"></i>
              {{ formatDate(project.dataInicio) }}
            </span>
            <span class="activities-count">
              <i class="fas fa-tasks"></i>
              {{ project.atividades?.length || 0 }} atividades
            </span>
          </div>
        </div>

        <router-link
          :to="`/projects/${project.id}`"
          class="details-link"
          @click.stop>
          Ver detalhes →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  filterStatus: {
    type: String,
    default: null
  }
})

const projects = ref([])
const loading = ref(true)
const error = ref(null)

const statusClass = (status) => ({
  'status-open': status === 'ABERTO',
  'status-in-progress': status === 'EM_ANDAMENTO',
  'status-closed': status === 'FECHADO'
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const fetchProjects = async () => {
  try {
    const endpoint = props.filterStatus
      ? `/projetos?status=${props.filterStatus}`
      : '/projetos'

    const response = await axios.get(endpoint)
    projects.value = response.data
  } catch (err) {
    error.value = err.message || 'Erro ao buscar projetos'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.project-list {
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
}

.project-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-name {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.project-status {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.status-open {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-in-progress {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status-closed {
  background-color: #ffebee;
  color: #c62828;
}

.client-info {
  margin: 0.5rem 0;
  color: #666;
}

.meta-info {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.meta-info i {
  margin-right: 0.5rem;
}

.details-link {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  text-decoration: none;
  color: #2196F3;
  font-weight: 500;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #c62828;
}
</style>
