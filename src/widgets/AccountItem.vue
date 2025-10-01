<script setup lang="ts">
import type { Account } from '@/entities/account/types/account.dto';
import { ref } from 'vue';
import { ElForm, ElFormItem, ElButton, ElInput, ElIcon, type FormRules, type FormInstance, ElSelect } from 'element-plus';
import { DeleteFilled } from '@element-plus/icons-vue'
import { useValidate } from '@/shared/composables/useValidate';

const props = defineProps<{ account: Account }>()
const emits = defineEmits<{
    (e: 'deleteAccount', account: Account): void
    (e: 'createAccount', account: Account): void
}>()

const { isRequired } = useValidate()
const formRef = ref<FormInstance>()
defineExpose({ formRef })

const formRules: FormRules = {
    entry_type: [isRequired({ message: ' ', trigger: 'blur' })],
    login: [isRequired({ message: ' ', trigger: 'blur' })],
    password: [isRequired({ message: ' ', trigger: 'blur' })]
};

const entryTypeData = [{ value: "LDAP", label: "LDAP" }, { value: "Локальная", label: "Локальная" }]

const accountValue = ref({
    id: props.account.id,
    tags: props.account.tags,
    entry_type: props.account.entry_type,
    login: props.account.login,
    password: props.account.password
})

function handleDeleteAccount() {
    emits('deleteAccount', accountValue.value)
}

async function handleFieldBlur(field: keyof typeof accountValue.value) {
    if (!formRef.value) return;

    await formRef.value.validateField(field).catch(() => { });

    try {
        await formRef.value.validate();
        emits('createAccount', accountValue.value);
    } catch {
    }
}
</script>

<template>
    <el-form ref="formRef" :model="accountValue" :rules="formRules">
        <div class="flex w-full gap-2">
            <el-form-item prop="tags">
                <el-input v-model="accountValue.tags" size="large" @blur="handleFieldBlur('tags')" />
            </el-form-item>
            <el-form-item prop="entry_type">
                <el-select v-model="accountValue.entry_type" :options="entryTypeData" size="large"
                    @blur="handleFieldBlur('entry_type')" />
            </el-form-item>
            <el-form-item prop="login">
                <el-input v-model="accountValue.login" size="large" @blur="handleFieldBlur('login')" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="accountValue.password" size="large" @blur="handleFieldBlur('password')" />
            </el-form-item>
            <el-form-item>
                <el-button type="danger" plain @click="handleDeleteAccount">
                    <el-icon>
                        <DeleteFilled />
                    </el-icon>
                </el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<style scoped></style>
