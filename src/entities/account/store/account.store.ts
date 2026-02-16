import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '../types/account.dto'

export const useAccountStore = defineStore('account-store', () => {
  const accounts = ref<Account[]>([])

  function editAccount(accountId: string, patch: Partial<Account>) {
    const accountFind = accounts.value.find(acc => acc.id === accountId)
    if (!accountFind)
      return
    Object.assign(accountFind, patch)
  }

  function addAccount(newAccount: Account) {
    accounts.value?.push(newAccount)
  }

  function deleteAccount(accountId: string) {
    accounts.value = accounts.value?.filter(account => account.id !== accountId)
  }

  return { accounts, editAccount, addAccount, deleteAccount }
}, { persist: true })
