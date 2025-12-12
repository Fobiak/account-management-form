<script setup lang="ts">
import type { Account } from '@/entities/account/types/account.dto';
import { ref } from 'vue';
import { ElForm, ElFormItem, ElButton, ElInput, ElIcon, type FormRules, type FormInstance, ElSelect, ElMessage } from 'element-plus';
import { DeleteFilled } from '@element-plus/icons-vue'
import { useValidate } from '@/shared/composables/useValidate';
import { ENTRY_TYPE_LDAP, ENTRY_TYPE_LOCAL, entryTypeData, FIELDS_FORMS } from './config/constants';

const props = defineProps<{ account: Account }>()
const emits = defineEmits<{
    (e: 'deleteAccount', account: Account): void
    (e: 'editAccount', account: Account): void
}>()

const { isRequired } = useValidate()
const formRef = ref<FormInstance>()
defineExpose({ formRef })

const formRules: FormRules = {
    entry_type: [isRequired({ message: ' ', trigger: 'blur' })],
    login: [isRequired({ message: ' ', trigger: 'blur' })],
    password: [isRequired({ message: ' ', trigger: 'blur' })]
};

const accountValue = ref({
    id: props.account.id,
    tags: props.account.tags,
    entry_type: props.account.entry_type,
    login: props.account.login,
    password: props.account.password
})

const tagsInput = ref(
    accountValue.value.tags.map(t => t.text).join(';')
)

function handleDeleteAccount() {
    emits('deleteAccount', accountValue.value)
}

function handlePasswordChange(value: string) {
    if (value === ENTRY_TYPE_LDAP) {
        accountValue.value.password = null
    }
}

async function handleFieldBlur(field: typeof FIELDS_FORMS[keyof typeof FIELDS_FORMS]) {
    if (!formRef.value) return;

    if (field === FIELDS_FORMS.TAGS) {
        accountValue.value.tags = tagsInput.value
            .split(';')
            .map(tag => tag.trim())
            .filter(Boolean)
            .map(tag => ({ text: tag }))
    }

    await formRef.value.validateField(field).catch(() => { });

    try {
        await formRef.value.validate();
        emits('editAccount', accountValue.value);
    } catch (error) {
        console.error('Ошибка валидации поля:', error)
        ElMessage.error('Проверьте заполнение полей формы')
    }
}
</script>

<template>
    <el-form ref="formRef" :model="accountValue" :rules="formRules">
        <div class="flex w-[805px] gap-2">
            <el-form-item prop="tags" class="w-[120px]">
                <el-input v-model="tagsInput" maxlength="50" @blur="handleFieldBlur(FIELDS_FORMS.TAGS)" />
            </el-form-item>

            <el-form-item prop="entry_type" class="w-[184px]">
                <el-select v-model="accountValue.entry_type" placeholder="Выбери тип записи" :options="entryTypeData"
                    @blur="handleFieldBlur(FIELDS_FORMS.ENTRY_TYPE)" />
            </el-form-item>

            <el-form-item prop="login" class="flex-1">
                <el-input v-model="accountValue.login" maxlength="100" @blur="handleFieldBlur(FIELDS_FORMS.LOGIN)" />
            </el-form-item>

            <el-form-item v-if="accountValue.entry_type === ENTRY_TYPE_LOCAL" prop="password" class="w-[184px]">
                <el-input v-model="accountValue.password" maxlength="100" show-password
                    @blur="handleFieldBlur(FIELDS_FORMS.PASSWORD)"
                    @change="handlePasswordChange(accountValue.entry_type)" />
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
