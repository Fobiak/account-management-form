import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '../types/account.dto'
import { v4 as uuidv4 } from 'uuid'

export const useAccountStore = defineStore('account-store', () => {
  const accounts = ref<Account[]>([])

  function addAccount() {
    accounts.value?.push({
      id: uuidv4(),
      tags: [],
      entry_type: '',
      login: '',
      password: ''
    })
  }

  function editAccount(accountId: string, patch: Partial<Account>) {
    const accountFind = accounts.value.find(acc => acc.id === accountId)
    if (!accountFind)
      return
    Object.assign(accountFind, patch)
  }

  function deleteAccount(accountId: string) {
    accounts.value = accounts.value?.filter(account => account.id !== accountId)
  }

  return { accounts, editAccount, addAccount, deleteAccount }
}, { persist: true })
