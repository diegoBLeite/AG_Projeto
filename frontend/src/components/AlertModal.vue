<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="close" class="close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <p>{{ message }}</p>
      </div>

      <div class="modal-actions">
        <BaseButton variant="secondary" @click="close">Cancelar</BaseButton>
        <BaseButton variant="danger" @click="confirm">Confirmar</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Confirmação'
  },
  message: String
})

const emit = defineEmits(['confirm', 'close'])

const confirm = () => emit('confirm')
const close = () => emit('close')
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
