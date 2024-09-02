<script setup lang="ts">
import { ref, watch } from 'vue'
import { NCard, NSelect, NInputNumber } from 'naive-ui'
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()
const currencyFrom = ref('rub')
const currencyTo = ref('usd')

const amountFrom = ref(1)
const amountTo = ref(1)

function convertCurrency(source?: 'from' | 'to') {
  if (source === 'from') {
    amountTo.value = Number(
      (
        amountFrom.value *
        (currencyStore.ratePairs[`${currencyFrom.value}-${currencyTo.value}`] || 1)
      ).toFixed(2)
    )
  } else {
    amountFrom.value = Number(
      (
        amountTo.value * (currencyStore.ratePairs[`${currencyTo.value}-${currencyFrom.value}`] || 1)
      ).toFixed(2)
    )
  }
}

watch(
  [currencyFrom, currencyTo],
  () => {
    convertCurrency('from')
  },
  { immediate: true }
)
</script>

<template>
  <NCard class="w-fit mx-auto">
    <div class="flex flex-col gap-3 w-fit">
      <div class="flex gap-3">
        <NInputNumber
          v-model:value="amountFrom"
          :show-button="false"
          @update:value="convertCurrency('from')"
        />
        <NSelect
          v-model:value="currencyFrom"
          :options="
            currencyStore.CURRENCIES.map((currency) => ({
              label: currency.code.toUpperCase(),
              value: currency.code
            }))
          "
          class="w-28"
        />
      </div>
      <div class="flex gap-3">
        <NInputNumber
          v-model:value="amountTo"
          :show-button="false"
          @update:value="convertCurrency('to')"
        />
        <NSelect
          v-model:value="currencyTo"
          :options="
            currencyStore.CURRENCIES.map((currency) => ({
              label: currency.code.toUpperCase(),
              value: currency.code
            }))
          "
          class="w-28"
        />
      </div>
    </div>
  </NCard>
</template>
