<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { RouterView } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutContent, useMessage } from 'naive-ui'
import { useCurrencyStore } from '@/stores/currency'
import AppHeader from '@/components/AppHeader.vue'
import AppLoader from '@/components/AppLoader.vue'

const currencyStore = useCurrencyStore()
const message = useMessage()

const isLoading = ref(false)
const isError = ref(false)

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await currencyStore.loadExchangeRate()
  } catch (error) {
    message.error((error as Error).message)
    isError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NLayout class="h-full">
    <div class="max-w-screen-sm mx-auto">
      <NLayoutHeader class="p-2 flex justify-between items-center">
        <AppHeader />
      </NLayoutHeader>
      <NLayoutContent class="p-6">
        <div v-if="isLoading" class="w-full h-20 flex items-center justify-center">
          <AppLoader />
        </div>
        <div v-else-if="isError" class="w-full h-20 flex items-center justify-center text-xl">
          Нет данных
        </div>
        <RouterView v-else v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </NLayoutContent>
    </div>
  </NLayout>
</template>
