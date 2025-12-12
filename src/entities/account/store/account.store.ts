import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '../types/account.dto'

export const useAccountStore = defineStore('account-store', () => {
  const accounts = ref<Account[]>([])

  function editAccount(account: Account) {
    const accountId = accounts.value.findIndex(acc => acc.id === account.id)
    accounts.value[accountId] = { ...account }
  }

  function addAccount(newAccount: Account) {
    accounts.value?.push(newAccount)
  }

  function deleteAccount(accountId: string) {
    accounts.value = accounts.value?.filter(account => account.id !== accountId)
  }

  return { accounts, editAccount, addAccount, deleteAccount }
}, { persist: true })
