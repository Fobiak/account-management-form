export const ENTRY_TYPE_LDAP = 'ldap'
export const ENTRY_TYPE_LOCAL = 'local'

export const entryTypeData = [
  { value: ENTRY_TYPE_LDAP, label: 'LDAP' },
  { value: ENTRY_TYPE_LOCAL, label: 'Локальная' }
]

export const FIELDS_FORMS = {
  TAGS: 'tags',
  ENTRY_TYPE: 'entry_type',
  LOGIN: 'login',
  PASSWORD: 'password',
}
