<script setup lang="ts">
import { h, onBeforeMount, ref } from 'vue'
import type { Component } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NIcon,
  NDropdown,
  NButton,
  useMessage
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { HomeOutline, SyncOutline } from '@vicons/ionicons5'
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()
const message = useMessage()

const isLoading = ref(false)
const isError = ref(false)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home'
          },
          class: 'font-bold text-xl'
        },
        { default: () => 'Главная' }
      ),
    key: 'home',
    icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'convert'
          },
          class: 'font-bold text-xl'
        },
        { default: () => 'Конвертация' }
      ),
    key: 'convert',
    icon: renderIcon(SyncOutline)
  }
]

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
        <NMenu :value="String($route.name)" :options="menuOptions" mode="horizontal" />
        <NDropdown
          class="relative"
          trigger="click"
          :options="
            currencyStore.CURRENCIES.map((currency) => ({
              label: currency.symbol,
              key: currency.symbol
            }))
          "
          @select="
            currencyStore.currentCurrency =
              currencyStore.CURRENCIES.find((currency) => currency.symbol === $event) ||
              currencyStore.CURRENCIES[0]
          "
        >
          <NButton
            class="font-bold text-xl absolute bottom-5 right-5 sm:relative sm:bottom-0 sm:right-0"
            >{{ currencyStore.currentCurrency.symbol }}</NButton
          >
        </NDropdown>
      </NLayoutHeader>
      <NLayoutContent class="p-6">
        <div v-if="isLoading" class="w-full h-20 flex items-center justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div v-else-if="isError" class="w-full h-20 flex items-center justify-center text-xl">
          Нет данных
        </div>
        <RouterView v-else />
      </NLayoutContent>
    </div>
  </NLayout>
</template>
