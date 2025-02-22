<template>
  <button
    :type="type"
    :class="['base-button', variant]"
    :disabled="loading || disabled"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'danger'].includes(value)
  },
  loading: Boolean,
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.primary {
  background-color: #2196F3;
  color: white;
  border: 1px solid #2196F3;
}

.secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.danger {
  background-color: #ff4444;
  color: white;
  border: 1px solid #ff4444;
}

.loader {
  width: 16px;
  height: 16px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
