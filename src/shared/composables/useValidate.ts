import type { FormItemRule } from 'element-plus'

function isRequired(options?: { trigger?: 'blur' | 'change', message?: string }): FormItemRule {
  return {
    required: true,
    message: options?.message || 'Обязательное поле',
    trigger: options?.trigger || 'change',
  }
}

function min(min: number, options?: { trigger?: 'blur' | 'change', message?: string }): FormItemRule {
  const { message } = options || {}
  return {
    min,
    message: message || `Минимум ${min} символов`,
    trigger: options?.trigger || 'change',
    type: 'number',
  }
}

export function useValidate() {
  return {
    isRequired,
    min,
  }
}
