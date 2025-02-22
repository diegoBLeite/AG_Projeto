<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'default'
      return () => import(`@/layouts/${layout}Layout.vue`)
    }
  }
}
</script>
