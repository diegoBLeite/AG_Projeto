<template>
  <div class="project-form">
    <h2>{{ isEditMode ? 'Editar Projeto' : 'Novo Projeto' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nome do Projeto *</label>
        <input v-model="form.nome" required>
        <span class="error" v-if="errors.nome">{{ errors.nome }}</span>
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="form.descricao" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Status *</label>
        <select v-model="form.status" required>
          <option v-for="status in statusOptions" :value="status" :key="status">
            {{ formatStatus(status) }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Cliente *</label>
        <ClientSelect v-model="form.clienteId" />
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
        <router-link to="/" class="cancel-btn">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ClientSelect from '@/components/ClientSelect.vue'

const route = useRoute()
const router = useRouter()

const form = ref({
  nome: '',
  descricao: '',
  status: 'ABERTO',
  clienteId: null
})

const statusOptions = ref(['ABERTO', 'EM_ANDAMENTO', 'FECHADO'])
const loading = ref(false)
const errors = ref({})

const isEditMode = computed(() => route.name === 'EditProject')

const fetchProject = async (id) => {
  try {
    const response = await axios.get(`/projetos/${id}`)
    form.value = {
      ...response.data,
      clienteId: response.data.cliente?.id
    }
  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    errors.value = {}

    const payload = {
      ...form.value,
      cliente: { id: form.value.clienteId }
    }

    if (isEditMode.value) {
      await axios.put(`/projetos/${route.params.id}`, payload)
    } else {
      await axios.post('/projetos', payload)
    }

    router.push('/')
  } catch (error) {
    if (error.response?.data) {
      errors.value = error.response.data
    }
  } finally {
    loading.value = false
  }
}

const formatStatus = (status) => {
  const statusMap = {
    ABERTO: 'Aberto',
    EM_ANDAMENTO: 'Em Andamento',
    FECHADO: 'Fechado'
  }
  return statusMap[status]
}

onMounted(() => {
  if (isEditMode.value && route.params.id) {
    fetchProject(route.params.id)
  }
})
</script>
