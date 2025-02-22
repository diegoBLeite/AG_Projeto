<template>
  <div class="app-layout">
    <AppHeader />
    <main :class="layoutClass">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
