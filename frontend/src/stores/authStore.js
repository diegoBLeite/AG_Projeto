import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },
    loadToken() {
      this.token = localStorage.getItem('auth_token')
    },
    logout() {
      this.token = null
      localStorage.removeItem('auth_token')
    }
  }
})
