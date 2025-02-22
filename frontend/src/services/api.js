import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

// Configuração da instância principal do Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptor para adicionar o token JWT às requisições
apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// Interceptor para tratamento global de erros
apiClient.interceptors.response.use(
  response => response,
  error => {
    const authStore = useAuthStore()

    if (error.response) {
      switch (error.response.status) {
        case 401:
          authStore.logout()
          router.push({ name: 'login', query: { expired: true } })
          break

        case 403:
          router.push({ name: 'home' })
          break

        case 500:
          console.error('Server Error:', error.config.url)
          break
      }
    }

    return Promise.reject({
      code: error.response?.status || 0,
      message: error.response?.data?.message || error.message,
      details: error.response?.data?.errors
    })
  }
)

// Serviços específicos da aplicação
const apiService = {
  // Autenticação
  auth: {
    login: credentials => apiClient.post('/auth/login', credentials),
    refreshToken: () => apiClient.post('/auth/refresh-token'),
    logout: () => apiClient.post('/auth/logout')
  },

  // Clientes
  clients: {
    getAll: params => apiClient.get('/clientes', { params }),
    getById: id => apiClient.get(`/clientes/${id}`),
    create: client => apiClient.post('/clientes', client),
    update: (id, client) => apiClient.put(`/clientes/${id}`, client),
    delete: id => apiClient.delete(`/clientes/${id}`)
  },

  // Projetos
  projects: {
    getAll: params => apiClient.get('/projetos', { params }),
    getOpenProjects: () => apiClient.get('/projetos/abertos'),
    getById: id => apiClient.get(`/projetos/${id}`),
    create: project => apiClient.post('/projetos', project),
    update: (id, project) => apiClient.put(`/projetos/${id}`, project),
    delete: id => apiClient.delete(`/projetos/${id}`),
    getActivities: id => apiClient.get(`/projetos/${id}/atividades`)
  },

  // Atividades
  activities: {
    getAll: params => apiClient.get('/atividades', { params }),
    getById: id => apiClient.get(`/atividades/${id}`),
    create: activity => apiClient.post('/atividades', activity),
    update: (id, activity) => apiClient.put(`/atividades/${id}`, activity),
    delete: id => apiClient.delete(`/atividades/${id}`),
    updateStatus: (id, status) => apiClient.patch(`/atividades/${id}/status`, { status })
  },

  // Upload de arquivos
  uploads: {
    uploadFile: (file, entityType, entityId) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('entityType', entityType)
      formData.append('entityId', entityId)

      return apiClient.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}

// Instância Axios para uploads com timeout maior
export const uploadClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${useAuthStore().token}`
  }
})

export default apiService
