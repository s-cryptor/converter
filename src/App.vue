<script setup lang="ts">
import App from '@/components/App.vue'
import { NConfigProvider, darkTheme, NMessageProvider } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme="darkTheme" class="h-screen">
    <NMessageProvider>
      <App />
    </NMessageProvider>
  </NConfigProvider>
</template>
