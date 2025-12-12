import type { FormItemRule } from 'element-plus'

function isRequired(options?: { trigger?: 'blur' | 'change', message?: string }): FormItemRule {
  return {
    required: true,
    message: options?.message || 'Обязательное поле',
    trigger: options?.trigger || 'change',
  }
}

export function useValidate() {
  return {
    isRequired,
  }
}
