<script setup lang="ts">
import { h } from 'vue'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu, NIcon, NDropdown, NButton } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { HomeOutline, SyncOutline } from '@vicons/ionicons5'
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()

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
</script>

<template>
  <NMenu :value="String($route.name)" :options="menuOptions" mode="horizontal" />
  <NDropdown
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
    <NButton class="font-bold text-xl fixed bottom-5 right-5 sm:relative sm:bottom-0 sm:right-0">{{
      currencyStore.currentCurrency.symbol
    }}</NButton>
  </NDropdown>
</template>
