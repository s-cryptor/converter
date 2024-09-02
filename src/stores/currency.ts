import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Currency {
  name: string
  symbol: string
  code: string
}

export const useCurrencyStore = defineStore('currency', () => {
  const CURRENCIES: Currency[] = [
    { name: 'Рубль', symbol: '₽', code: 'rub' },
    { name: 'Доллар', symbol: '$', code: 'usd' },
    { name: 'Евро', symbol: '€', code: 'eur' }
  ] as const

  const currentCurrency = ref<Currency>(CURRENCIES[0])
  const ratePairs = ref<Record<string, number>>({})

  async function loadExchangeRate() {
    try {
      const response = await axios.get('https://status.neuralgeneration.com/api/currency')
      if (response.status === 200) {
        ratePairs.value = response.data
      } else {
        throw new Error()
      }
    } catch {
      throw new Error('Не удалось загрузить курс валют. Обновите страницу или попробуйте позже')
    }
  }

  return { CURRENCIES, currentCurrency, ratePairs, loadExchangeRate }
})
