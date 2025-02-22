<template>
  <span :class="['status-badge', status]">
    {{ formattedStatus }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: value => ['ABERTO', 'EM_ANDAMENTO', 'FECHADO', 'PENDENTE', 'CONCLUIDA'].includes(value)
  }
})

const formattedStatus = computed(() => {
  const statusMap = {
    ABERTO: 'Aberto',
    EM_ANDAMENTO: 'Em Andamento',
    FECHADO: 'Fechado',
    PENDENTE: 'Pendente',
    CONCLUIDA: 'Concluído'
  }
  return statusMap[props.status] || props.status
})
</script>

<style scoped>
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
}

.ABERTO {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.EM_ANDAMENTO {
  background-color: #fff3e0;
  color: #ef6c00;
}

.FECHADO {
  background-color: #ffebee;
  color: #c62828;
}

.PENDENTE {
  background-color: #e3f2fd;
  color: #1565c0;
}

.CONCLUIDA {
  background-color: #f3e5f5;
  color: #6a1b9a;
}
</style>
