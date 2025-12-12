import { computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useAccountStore } from '@/entities/account/store/account.store'
import type { Account } from '@/entities/account/types/account.dto'
import { ENTRY_TYPE_LOCAL } from '@/entities/account/config/constants'
import { storeToRefs } from 'pinia'

export function useAccounts() {
  const accountStore = useAccountStore()
  const { accounts } = storeToRefs(accountStore)

  const showPasswordLabel = computed(() =>
    accounts.value.some(acc => acc.entry_type === ENTRY_TYPE_LOCAL)
  )

  function addAccount() {
    accountStore.addAccount({
      id: uuidv4(),
      tags: [],
      entry_type: '',
      login: '',
      password: ''
    })
  }

  function editAccount(account: Account) {
    accountStore.editAccount(account)
  }

  function deleteAccount(accountId: string) {
    accountStore.deleteAccount(accountId)
  }

  return {
    accounts,
    showPasswordLabel,
    addAccount,
    editAccount,
    deleteAccount,
  }
}
