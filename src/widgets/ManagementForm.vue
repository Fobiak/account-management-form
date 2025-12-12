<script setup lang="ts">
import { useAccountStore } from '@/entities/account/store/account.store';
import { storeToRefs } from 'pinia';
import AccountItem from './AccountItem.vue';
import { Plus } from '@element-plus/icons-vue'
import type { Account } from '@/entities/account/types/account.dto';
import { onMounted, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { v4 as uuidv4 } from 'uuid'

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)
const itemRef = ref<FormInstance>()

async function handleAddAccount() {
    accountStore.addAccount({
        id: uuidv4(),
        tags: [],
        entry_type: '',
        login: '',
        password: ''
    })
}

function handleEditAccount(account: Account) {
    accountStore.editAccount(account)
}

function handleDeleteAccount(account: Account) {
    accountStore.deleteAccount(account.id)
}

onMounted(() => {
    accounts.value = accountStore.accounts.filter(acc => acc.login?.trim())
})
</script>

<template>
    <div class="flex flex-col justify-center gap-4 px-[29vw] py-9">
        <div class="flex items-center gap-4">
            <h5 class="text-large text-text_primary">
                Учетные записи
            </h5>
            <el-button :icon="Plus" @click="handleAddAccount" size="large" />
        </div>

        <el-alert v-if="accounts.length" type="info" show-icon :closable="false" center>
            <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"</p>
        </el-alert>

        <div v-if="accounts.length" class="grid grid-cols-[120px_184px_1fr_184px_40px] gap-2 w-[805px]">
            <p>Метки</p>
            <p>Тип записи</p>
            <p>Логин</p>
            <p>Пароль</p>
        </div>

        <div class="flex flex-col items-center gap-2">
            <AccountItem v-for="(account) in accounts" ref="itemRef" :key="account.id" :account="account"
                @edit-account="(newAccount) => handleEditAccount(newAccount)"
                @delete-account="(account) => handleDeleteAccount(account)" />
        </div>
    </div>
</template>
