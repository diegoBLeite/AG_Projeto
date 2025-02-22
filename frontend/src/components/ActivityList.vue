<template>
  <div class="activity-list">
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Carregando atividades...
    </div>

    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <div v-else>
      <div v-if="activities.length === 0" class="empty-state">
        Nenhuma atividade cadastrada neste projeto
      </div>

      <div v-for="activity in activities"
           :key="activity.id"
           class="activity-card"
           :class="{'completed': activity.status === 'CONCLUIDA'}">
        <div class="card-header">
          <h4 class="activity-title">{{ activity.titulo }}</h4>
          <span class="activity-status" :class="statusClass(activity.status)">
            {{ formatStatus(activity.status) }}
          </span>
        </div>

        <div class="card-body">
          <p class="activity-description">{{ activity.descricao }}</p>

          <div class="meta-info">
            <span class="creation-date">
              <i class="fas fa-calendar-plus"></i>
              {{ formatDate(activity.dataCriacao) }}
            </span>
            <span v-if="activity.dataConclusao" class="completion-date">
              <i class="fas fa-check-circle"></i>
              {{ formatDate(activity.dataConclusao) }}
            </span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-edit" @click.stop="$emit('edit', activity)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-delete" @click.stop="$emit('delete', activity.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  activities: {
    type: Array,
    default: () => [],
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const { activities, loading, error } = toRefs(props)

const statusClass = (status) => ({
  'pending': status === 'PENDENTE',
  'completed': status === 'CONCLUIDA'
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const formatStatus = (status) => {
  const statusMap = {
    'PENDENTE': 'Pendente',
    'CONCLUIDA': 'Concluída'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.activity-list {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.activity-card {
  background: #fff;
  border-left: 4px solid #e0e0e0;
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: relative;
}

.activity-card.completed {
  border-left-color: #4CAF50;
  opacity: 0.8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.activity-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.activity-status {
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

.pending {
  background-color: #fff3e0;
  color: #ef6c00;
}

.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.activity-description {
  color: #616161;
  font-size: 0.95rem;
  margin: 0.5rem 0;
}

.meta-info {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #757575;
}

.meta-info i {
  margin-right: 0.3rem;
}

.card-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.btn-edit, .btn-delete {
  border: none;
  background: none;
  padding: 0.3rem;
  cursor: pointer;
  color: #757575;
  transition: color 0.2s;
}

.btn-edit:hover {
  color: #2196F3;
}

.btn-delete:hover {
  color: #c62828;
}

.loading, .error, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #616161;
}

.loading i {
  margin-right: 0.5rem;
}

.error {
  color: #c62828;
}

.empty-state {
  font-style: italic;
}
</style>
