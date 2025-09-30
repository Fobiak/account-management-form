<script setup lang="ts">
import { useAccountStore } from '@/entities/account/store/account.store';
import { storeToRefs } from 'pinia';
import AccountItem from './AccountItem.vue';
import { Plus } from '@element-plus/icons-vue'

function handleAddAccount() {
    accounts.value?.push({
        id: accounts.value.length + 1,
        tags: '',
        entry_type: '',
        login: '',
        password: ''
    })
}

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)

</script>

<template>
    <div class="flex gap-4 p-20 justify-center">
        <h5 class="text-large text-text_primary">
            Учетные записи
        </h5>
        <el-button :icon="Plus" @click="handleAddAccount" />
    </div>
    <div class="flex flex-col justify-between">
        <div class="flex w-[516px] flex-col gap-4">
            <AccountItem v-for="(account) in accounts" :key="account.id" :account="account"/>
        </div>
    </div>
</template>
