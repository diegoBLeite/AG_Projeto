import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// Configuração Global do Axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Interceptor para Autenticação
axios.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config})

// Criação da Aplicação
const app = createApp(App)

// Plugins Essenciais
app.use(createPinia())
app.use(router)

// Componentes Globais
const requireComponent = import.meta.glob('./components/ui/*.vue')
Object.entries(requireComponent).forEach(([path, component]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  app.component(componentName, component)
})

// Diretivas Globais
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// Tratamento Global de Erros
app.config.errorHandler = (err, instance, info) => {
  console.error('Global Error Handler:', err)
  const authStore = useAuthStore()
  authStore.setError(err.message)
}

// Montagem da Aplicação
app.mount('#app')

// Guarda de Navegação Global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  authStore.loadToken() // Carrega token do localStorage

  // Redirecionamento para login se necessário
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Redirecionamento de usuários autenticados
  else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'Home' })
  }
  // Carrega dados necessários para views específicas
  else if (to.meta.dataLoader) {
    try {
      await to.meta.dataLoader()
      next()
    } catch (error) {
      next({ name: 'Error', params: { error } })
    }
  }
  else {
    next()
  }
})
