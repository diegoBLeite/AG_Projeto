import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import axios from 'axios'

// Config Axios
axios.defaults.baseURL = 'http://localhost:8080/api'

const app = createApp(App)

// Router
const router = createRouter({
history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/projects/:id', component: () => import('./views/ProjectDetails.vue') }
  ]
})

app.use(router)
app.mount('#app')
