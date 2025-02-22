import { createRouter, createWebHistory } from 'vue-router'

// Importação dinâmica dos componentes
const HomeView = () => import('@/views/HomeView.vue')
const ProjectDetails = () => import('@/views/ProjectDetails.vue')
const ProjectForm = () => import('@/views/ProjectForm.vue')
const ClientList = () => import('@/views/ClientList.vue')

const routes = [
{
path: '/',
name: 'Home',
component: HomeView,
meta: {
title: 'Dashboard - Gestão de Projetos'
}
},
{
path: '/projects/:id',
name: 'ProjectDetails',
component: ProjectDetails,
props: true,
meta: {
title: 'Detalhes do Projeto'
}
},
{
path: '/projects/new',
name: 'NewProject',
component: ProjectForm,
meta: {
title: 'Novo Projeto'
}
},
{
path: '/projects/edit/:id',
name: 'EditProject',
component: ProjectForm,
props: true,
meta: {
title: 'Editar Projeto'
}
},
{
path: '/clients',
name: 'ClientList',
component: ClientList,
meta: {
title: 'Gestão de Clientes'
}
},
{
path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Atualização dinâmica do título da página
router.beforeEach((to) => {
  document.title = to.meta?.title || 'Gestão de Projetos AG Capital'
})

export default router
