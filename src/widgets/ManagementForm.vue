<script setup lang="ts">
import { useAccountStore } from '@/entities/account/store/account.store';
import { storeToRefs } from 'pinia';
import AccountItem from './AccountItem.vue';
import { Plus } from '@element-plus/icons-vue'
import type { Account } from '@/entities/account/types/account.dto';
import { ref } from 'vue';
import type { FormInstance } from 'element-plus';

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)
const itemRef = ref<FormInstance>()

async function handleAddAccount() {
    accounts.value.push({
        id: Date.now(),
        tags: '',
        entry_type: '',
        login: '',
        password: ''
    })

    console.warn(accounts.value, 'accounts')
}

function handleEditAccount(account: Account) {
    const accountId = accounts.value.findIndex(acc => acc.id === account.id)
    accounts.value[accountId] = { ...account }
}

function handleDeleteAccount(account: Account) {
    accountStore.deleteAccount(account.id)
}

</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-20">
        <div class="flex items-center gap-2">
            <h5 class="text-large text-text_primary">
                Учетные записи
            </h5>
            <el-button :icon="Plus" @click="handleAddAccount" />
        </div>

        <div class="flex flex-col items-center">
            {{ accounts }}
            <AccountItem v-for="(account) in accounts" ref="itemRef" :key="account.id" :account="account"
                @create-account="(newAccount) => handleEditAccount(newAccount)"
                @delete-account="(account) => handleDeleteAccount(account)" />
        </div>
    </div>
</template>
