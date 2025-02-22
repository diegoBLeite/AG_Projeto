import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Lazy-loaded components para code splitting
const HomeView = () => import('@/views/HomeView.vue')
const ProjectDetails = () => import('@/views/ProjectDetails.vue')
const ProjectForm = () => import('@/views/ProjectForm.vue')
const ClientList = () => import('@/views/ClientList.vue')
const ClientForm = () => import('@/views/ClientForm.vue')
const LoginView = () => import('@/views/LoginView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Dashboard - AG Capital',
      requiresAuth: true,
      breadcrumb: [{ name: 'Dashboard', path: '/' }]
    }
  },
  {
    path: '/projects/:id',
    name: 'project-details',
    component: ProjectDetails,
    props: true,
    meta: {
      title: 'Detalhes do Projeto',
      requiresAuth: true,
      breadcrumb: [
        { name: 'Dashboard', path: '/' },
        { name: 'Detalhes', path: '' }
      ]
    }
  },
  {
    path: '/projects/new',
    name: 'new-project',
    component: ProjectForm,
    meta: {
      title: 'Novo Projeto',
      requiresAuth: true,
      roles: ['MANAGER'],
      breadcrumb: [
        { name: 'Dashboard', path: '/' },
        { name: 'Novo Projeto', path: '' }
      ]
    }
  },
  {
    path: '/projects/edit/:id',
    name: 'edit-project',
    component: ProjectForm,
    props: true,
    meta: {
      title: 'Editar Projeto',
      requiresAuth: true,
      roles: ['MANAGER'],
      breadcrumb: [
        { name: 'Dashboard', path: '/' },
        { name: 'Editar Projeto', path: '' }
      ]
    }
  },
  {
    path: '/clients',
    name: 'client-list',
    component: ClientList,
    meta: {
      title: 'Gestão de Clientes',
      requiresAuth: true,
      breadcrumb: [
        { name: 'Dashboard', path: '/' },
        { name: 'Clientes', path: '' }
      ]
    }
  },
  {
    path: '/clients/new',
    name: 'new-client',
    component: ClientForm,
    meta: {
      title: 'Novo Cliente',
      requiresAuth: true,
      roles: ['ADMIN'],
      breadcrumb: [
        { name: 'Clientes', path: '/clients' },
        { name: 'Novo Cliente', path: '' }
      ]
    }
  },
  {
    path: '/clients/edit/:id',
    name: 'edit-client',
    component: ClientForm,
    props: true,
    meta: {
      title: 'Editar Cliente',
      requiresAuth: true,
      roles: ['ADMIN'],
      breadcrumb: [
        { name: 'Clientes', path: '/clients' },
        { name: 'Editar Cliente', path: '' }
      ]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login',
      guestOnly: true,
      layout: 'auth'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Página Não Encontrada',
      layout: 'empty'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initialize()

  // Set page title
  document.title = `${to.meta.title} | AG Capital` || 'AG Capital'

  // Redirect logic
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next({
        name: 'login',
        query: { redirect: encodeURIComponent(to.fullPath) }
      })
    }

    if (to.meta.roles && !to.meta.roles.includes(authStore.user.role)) {
      return next({ name: 'home' })
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  next()
})

export default router
