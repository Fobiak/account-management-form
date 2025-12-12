<script setup lang="ts">
import type { Account } from '@/entities/account/types/account.dto'
import { ref } from 'vue'
import { ElForm, ElFormItem, ElButton, ElInput, ElIcon, type FormRules, type FormInstance, ElSelect } from 'element-plus'
import { DeleteFilled } from '@element-plus/icons-vue'
import { useValidate } from '@/shared/composables/useValidate'
import { ENTRY_TYPE_LDAP, ENTRY_TYPE_LOCAL, entryTypeData, FIELDS_FORMS } from '@/entities/account/config/constants'
import { useAccountValidation } from '@/entities/account/composables/useAccountValidation'

const props = defineProps<{ account: Account }>()

const emits = defineEmits<{
    (e: 'deleteAccount', account: Account): void
    (e: 'editAccount', account: Account): void
}>()

const { isRequired } = useValidate()
const formRef = ref<FormInstance>()
const accountValue = ref({ ...props.account })
const tagsInput = ref(accountValue.value.tags.map(t => t.text).join(';'))
const { validateField } = useAccountValidation(formRef, accountValue, tagsInput, emits)

defineExpose({ formRef })

const formRules: FormRules = {
    entry_type: [isRequired({ message: ' ', trigger: 'blur' })],
    login: [isRequired({ message: ' ', trigger: 'blur' })],
    password: [isRequired({ message: ' ', trigger: 'blur' })]
}

function handleDeleteAccount() {
    emits('deleteAccount', accountValue.value)
}

function handlePasswordChange(value: string) {
    if (value === ENTRY_TYPE_LDAP)
        accountValue.value.password = null
}
</script>

<template>
    <el-form ref="formRef" :model="accountValue" :rules="formRules">
        <div class="flex w-[805px] gap-2">
            <el-form-item prop="tags" class="w-[120px]">
                <el-input v-model="tagsInput" maxlength="50" @blur="validateField(FIELDS_FORMS.TAGS)" />
            </el-form-item>

            <el-form-item prop="entry_type" class="w-[184px]">
                <el-select v-model="accountValue.entry_type" placeholder="Выбери тип записи" :options="entryTypeData"
                    @blur="validateField(FIELDS_FORMS.ENTRY_TYPE)" />
            </el-form-item>

            <el-form-item prop="login" class="flex-1">
                <el-input v-model="accountValue.login" maxlength="100" @blur="validateField(FIELDS_FORMS.LOGIN)" />
            </el-form-item>

            <el-form-item v-if="accountValue.entry_type === ENTRY_TYPE_LOCAL" prop="password" class="w-[184px]">
                <el-input v-model="accountValue.password" maxlength="100" show-password
                    @blur="validateField(FIELDS_FORMS.PASSWORD)"
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
