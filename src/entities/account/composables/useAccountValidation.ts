import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { Account } from '@/entities/account/types/account.dto'
import { ElMessage } from 'element-plus'
import { FIELDS_FORMS } from '@/entities/account/config/constants'

export function useAccountValidation(
  formRef: Ref<FormInstance | undefined>,
  accountValue: Ref<Account>,
  tagsInput: Ref<string>,
  emit: (e: 'editAccount', account: Account) => void
) {
  async function validateField(field: typeof FIELDS_FORMS[keyof typeof FIELDS_FORMS]) {
    if (!formRef.value) return

    if (field === FIELDS_FORMS.TAGS) {
      accountValue.value.tags = tagsInput.value
        .split(';')
        .map(t => t.trim())
        .filter(Boolean)
        .map(text => ({ text }))
    }

    try {
      await formRef.value.validateField(field)
      emit('editAccount', accountValue.value)
    } catch {
      ElMessage.error(`Поле ${field} заполнено неверно`)
    }
  }

  return { validateField }
}
