<script setup lang="ts">
import type { Account } from '@/entities/account/types/account.dto'
import { ref } from 'vue'
import { ElForm, ElFormItem, ElButton, ElInput, ElIcon, type FormRules, type FormInstance, ElSelect, ElMessage } from 'element-plus'
import { DeleteFilled } from '@element-plus/icons-vue'
import { useValidate } from '@/shared/composables/useValidate'
import { ENTRY_TYPE_LDAP, ENTRY_TYPE_LOCAL, entryTypeData, FIELDS_FORMS, type AccountField } from '@/entities/account/config/constants'
import { useAccountValidation } from '@/entities/account/composables/useAccountValidation'
import { formatTags } from '@/shared/composables/useFormattingTags'

const props = defineProps<{ account: Account }>()

const emits = defineEmits<{
    (e: 'deleteAccount', accountId: string): void
    (e: 'editAccount', accountId: string, patch: Partial<Account>): void
}>()

const { isRequired } = useValidate()
const formRef = ref<FormInstance>()
const accountValue = ref({ ...props.account })
const tagsInput = ref(accountValue.value.tags.map(t => t.text).join(';'))
const { validateField } = useAccountValidation(formRef)

const formRules: FormRules = {
    [FIELDS_FORMS.ENTRY_TYPE]: [isRequired({ trigger: 'blur' })],
    [FIELDS_FORMS.LOGIN]: [isRequired({ trigger: 'blur' })],
    [FIELDS_FORMS.PASSWORD]: [isRequired({ trigger: 'blur' })]
}

function onTagsBlur() {
    validateField(FIELDS_FORMS.TAGS,
        () => {
            const tags = formatTags(tagsInput.value)
            accountValue.value.tags = tags
            emits('editAccount', accountValue.value.id, { tags })
        },
        (e) => {
            ElMessage.error(e)
        }
    )
}

function onFieldBlur(field: AccountField) {
    validateField(field,
        () => emits('editAccount', accountValue.value.id, { [field]: accountValue.value[field as keyof typeof accountValue.value] }),
        (e) => ElMessage.error(e)
    )
}

function handleDeleteAccount() {
    emits('deleteAccount', accountValue.value.id)
}

function handlePasswordChange(value: string) {
    if (value === ENTRY_TYPE_LDAP)
        emits('editAccount', accountValue.value.id, { password: null })
}
</script>

<template>
    <el-form ref="formRef" :model="accountValue" :rules="formRules">
        <div class="flex w-[805px] gap-2">
            <el-form-item :prop="FIELDS_FORMS.TAGS" class="w-[120px]">
                <el-input v-model="tagsInput" maxlength="50" @blur="onTagsBlur" />
            </el-form-item>

            <el-form-item :prop="FIELDS_FORMS.ENTRY_TYPE" class="w-[184px]">
                <el-select v-model="accountValue.entry_type" placeholder="Выбери тип записи" :options="entryTypeData"
                    @blur="onFieldBlur(FIELDS_FORMS.ENTRY_TYPE)"
                    @change="handlePasswordChange(accountValue.entry_type)" />
            </el-form-item>

            <el-form-item :prop="FIELDS_FORMS.LOGIN" class="flex-1">
                <el-input v-model="accountValue.login" maxlength="100" @blur="onFieldBlur(FIELDS_FORMS.LOGIN)" />
            </el-form-item>

            <el-form-item v-if="accountValue.entry_type === ENTRY_TYPE_LOCAL" :prop="FIELDS_FORMS.PASSWORD"
                class="w-[184px]">
                <el-input v-model="accountValue.password" maxlength="100" show-password
                    @blur="onFieldBlur(FIELDS_FORMS.PASSWORD)" />
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
