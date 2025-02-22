<template>
  <div class="client-select">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="loading"
    >
      <option value="" disabled>Selecione um cliente</option>
      <option
        v-for="client in clients"
        :key="client.id"
        :value="client.id"
      >
        {{ client.nome }} - {{ formatCnpjCpf(client.cnpjCpf) }}
      </option>
    </select>
    <div v-if="loading" class="loading">Carregando clientes...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const clients = ref([])
const loading = ref(true)

const formatCnpjCpf = (value) => {
  return value.length === 11
    ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

onMounted(async () => {
  try {
    const response = await axios.get('/clientes')
    clients.value = response.data
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  } finally {
    loading.value = false
  }
})
</script>
