<template>
  <div>
    <h2>{{ project.nome }}</h2>
    <button @click="showAddActivity = true">Nova Atividade</button>
    
    <ActivityList :activities="activities" />

    <div v-if="showAddActivity" class="modal">
      <form @submit.prevent="addActivity">
        <input v-model="newActivity.titulo" placeholder="Título" required>
        <textarea v-model="newActivity.descricao" placeholder="Descrição"></textarea>
        <button type="submit">Salvar</button>
        <button @click="showAddActivity = false">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ActivityList from '../components/ActivityList.vue'

export default {
  components: { ActivityList },
  data() {
    return {
      project: {},
      activities: [],
      showAddActivity: false,
      newActivity: {
        titulo: '',
        descricao: '',
        projetoId: null
      }
    }
  },
  async created() {
    const projectId = this.$route.params.id
    const [projectRes, activitiesRes] = await Promise.all([
      axios.get(`/projetos/${projectId}`),
      axios.get(`/atividades?projetoId=${projectId}`)
    ])
    
    this.project = projectRes.data
    this.activities = activitiesRes.data
    this.newActivity.projetoId = projectId
  },
  methods: {
    async addActivity() {
      try {
        const response = await axios.post('/atividades', this.newActivity)
        this.activities.push(response.data)
        this.showAddActivity = false
        this.newActivity = { titulo: '', descricao: '', projetoId: this.project.id }
      } catch (error) {
        console.error('Erro ao criar atividade:', error)
      }
    }
  }
}
</script>