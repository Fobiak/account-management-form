<script setup lang="ts">
import type { Account } from '@/entities/account/types/account.dto';
import { ref } from 'vue';
import { ElForm, ElFormItem, ElButton } from 'element-plus';

const props = defineProps<{ account: Account }>()

const accountValue = ref({
    id: props.account.id,
    tags: props.account.tags,
    entry_type: props.account.entry_type,
    login: props.account.login,
    password: props.account.password
})
</script>

<template>
    <el-form ref="formRef" label-position="top">
        <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
                <el-form-item prop="tags">
                    <el-input v-model="accountValue.tags" size="small" class="w-[57px]" />
                </el-form-item>
                <el-form-item prop="type">
                    <el-input v-model="accountValue.entry_type" size="small" class="w-[57px]" />
                </el-form-item>
                <el-form-item prop="login">
                    <el-input v-model="accountValue.login" size="small" class="w-[57px]" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="accountValue.password" size="small" class="w-[57px]" />
                </el-form-item>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <el-button type="danger" plain size="small" class="size-8">
                    <el-icon size="16">
                        <DeleteFilled />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </el-form>
</template>

<style scoped></style>
