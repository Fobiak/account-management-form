import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { type AccountField } from '@/entities/account/config/constants'

export function useAccountValidation(
  formRef: Ref<FormInstance | undefined>
) {
  async function validateField(
    field: AccountField,
    onSuccess?: () => void,
    onError?: (message: string) => void
  ) {
    if (!formRef.value) return

    try {
      await formRef.value.validateField(field)
      onSuccess?.()
    } catch {
      onError?.(`Поле ${field} заполнено неверно`)
    }
  }

  return { validateField }
}
