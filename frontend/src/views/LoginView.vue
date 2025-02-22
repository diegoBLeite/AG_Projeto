<template>
  <div class="login-view">
    <div class="login-box">
      <h2>Acesso ao Sistema</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="credentials.email" required>
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="credentials.password" required>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await axios.post('/auth/login', credentials.value)
    authStore.setToken(response.data.accessToken)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>
