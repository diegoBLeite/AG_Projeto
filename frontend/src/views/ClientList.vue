<template>
  <div class="client-list">
    <div class="header">
      <h2>Clientes</h2>
      <router-link to="/clients/new" class="new-client-btn">
        <i class="fas fa-plus"></i> Novo Cliente
      </router-link>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ/CPF</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="loading-row">
              <i class="fas fa-spinner fa-spin"></i> Carregando...
            </td>
          </tr>

          <tr v-else-if="error">
            <td colspan="4" class="error-row">
              <i class="fas fa-exclamation-triangle"></i> {{ error }}
            </td>
          </tr>

          <tr v-else v-for="client in clients" :key="client.id">
            <td>{{ client.nome }}</td>
            <td>{{ formatCnpjCpf(client.cnpjCpf) }}</td>
            <td>
              <div>{{ client.email }}</div>
              <div>{{ client.telefone }}</div>
            </td>
            <td class="actions">
              <router-link
                :to="`/clients/edit/${client.id}`"
                class="edit-btn">
                <i class="fas fa-edit"></i>
              </router-link>
              <button
                @click="deleteClient(client.id)"
                class="delete-btn">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const clients = ref([])
const loading = ref(true)
const error = ref(null)

const fetchClients = async () => {
  try {
    const response = await axios.get('/clientes')
    clients.value = response.data
  } catch (err) {
    error.value = err.message || 'Erro ao carregar clientes'
  } finally {
    loading.value = false
  }
}

const formatCnpjCpf = (value) => {
  if (!value) return ''
  return value.length === 11
    ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const deleteClient = async (id) => {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    try {
      await axios.delete(`/clientes/${id}`)
      clients.value = clients.value.filter(c => c.id !== id)
    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
    }
  }
}

onMounted(fetchClients)
</script>
