<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div
      v-for="item in currencyStore.CURRENCIES.filter(
        (currency) => currency.code !== currencyStore.currentCurrency.code
      )"
      :key="item.code"
      class="text-xl"
    >
      <span v-if="currencyStore.ratePairs[`${item.code}-${currencyStore.currentCurrency.code}`]">
        1 {{ item.code.toUpperCase() }} =
        {{
          currencyStore.ratePairs[`${item.code}-${currencyStore.currentCurrency.code}`]?.toFixed(2)
        }}
        {{ currencyStore.currentCurrency.code.toUpperCase() }}
      </span>
    </div>
  </div>
</template>
