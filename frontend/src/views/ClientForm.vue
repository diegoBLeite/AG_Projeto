<template>
  <div class="client-form">
    <h2>{{ isEditMode ? 'Editar Cliente' : 'Novo Cliente' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nome *</label>
        <input v-model="form.nome" required>
        <span class="error" v-if="errors.nome">{{ errors.nome }}</span>
      </div>

      <div class="form-group">
        <label>CNPJ/CPF *</label>
        <input
          v-model="form.cnpjCpf"
          @input="validateCnpjCpf"
          required>
        <span class="error" v-if="errors.cnpjCpf">{{ errors.cnpjCpf }}</span>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="form.email">
      </div>

      <div class="form-group">
        <label>Telefone</label>
        <input v-model="form.telefone" v-mask="'(##) #####-####'">
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
        <router-link to="/clients" class="cancel-btn">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const form = ref({
  nome: '',
  cnpjCpf: '',
  email: '',
  telefone: ''
})

const loading = ref(false)
const errors = ref({})

const isEditMode = computed(() => route.name === 'EditClient')

const validateCnpjCpf = () => {
  const value = form.value.cnpjCpf.replace(/\D/g, '')
  if (value.length !== 11 && value.length !== 14) {
    errors.value.cnpjCpf = 'CNPJ/CPF inválido'
  } else {
    errors.value.cnpjCpf = null
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    errors.value = {}

    if (isEditMode.value) {
      await axios.put(`/clientes/${route.params.id}`, form.value)
    } else {
      await axios.post('/clientes', form.value)
    }

    router.push('/clients')
  } catch (error) {
    if (error.response?.data) {
      errors.value = error.response.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (isEditMode.value && route.params.id) {
    const response = await axios.get(`/clientes/${route.params.id}`)
    form.value = response.data
  }
})
</script>
