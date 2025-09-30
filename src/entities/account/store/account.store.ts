import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '../types/account.dto'

export const useAccountStore = defineStore('account-store', () => {
  const accounts = ref<Account[] | null>(null)

  function addAccount(newAccount: Account) {
    accounts.value?.push(newAccount)
  }


  return { accounts, addAccount }
})
