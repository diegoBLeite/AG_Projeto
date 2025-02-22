<template>
  <div class="not-found">
    <h1>404 - Página Não Encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <router-link to="/" class="home-link">
      Voltar para a página inicial
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  margin-top: 5rem;
}

.home-link {
  color: #2196F3;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
}
</style>
