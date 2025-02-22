import axios from 'axios'

export default {
  // Projetos
  getOpenProjects: () => axios.get('/projetos/abertos'),

  // Atividades
  getActivitiesByProject: (projectId) =>
    axios.get(`/atividades?projetoId=${projectId}`),

  createActivity: (activity) =>
    axios.post('/atividades', activity)
}
