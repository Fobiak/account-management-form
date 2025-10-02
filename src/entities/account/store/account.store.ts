import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '../types/account.dto'

export const useAccountStore = defineStore('account-store', () => {
  const accounts = ref<Account[]>([])

  function addAccount(newAccount: Account) {
    accounts.value?.push(newAccount)
  }
  function deleteAccount(accountId: string) {
    accounts.value = accounts.value?.filter(account => account.id !== accountId)
  }

  return { accounts, addAccount, deleteAccount }
}, { persist: true })
