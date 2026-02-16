<script setup lang="ts">
import AccountItem from './AccountItem.vue'
import { Plus } from '@element-plus/icons-vue'
import { useAccountStore } from '@/entities/account/store/account.store'
import { ENTRY_TYPE_LOCAL } from '@/entities/account/config/constants'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const accountStore = useAccountStore()
const { editAccount, deleteAccount, addAccount } = accountStore
const { accounts } =  storeToRefs(accountStore)

const showPasswordLabel = computed(() =>
    accounts.value.some(acc => acc.entry_type === ENTRY_TYPE_LOCAL)
)
</script>

<template>
    <div class="flex flex-col justify-center gap-4 px-[29vw] py-9">
        <div class="flex items-center gap-4">
            <h5 class="text-large text-text_primary">
                Учетные записи
            </h5>
            <el-button :icon="Plus" @click="addAccount" size="large" />
        </div>

        <el-alert v-if="accounts.length" type="info" show-icon :closable="false" center>
            <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"</p>
        </el-alert>

        <div v-if="accounts.length" class="grid grid-cols-[120px_184px_1fr_184px_40px] gap-2 w-[805px]">
            <p>Метки</p>
            <p>Тип записи</p>
            <p>Логин</p>
            <p v-if="showPasswordLabel">Пароль</p>
        </div>

        <div class="flex flex-col items-center gap-2">
            <AccountItem v-for="account in accounts" :key="account.id" :account="account" @edit-account="editAccount"
                @delete-account="deleteAccount" />
        </div>
    </div>
</template>
