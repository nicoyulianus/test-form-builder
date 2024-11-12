export type Personal = { label: string; value: string }

export interface Fields {
  type: 'textfield' | 'radio' | 'textarea' | 'autocomplete'
  label: string
  placeholder?: string
  required: boolean
  options?: Personal[]
}

export interface Data {
  step: number
  title: string
  description: string
  fields: Fields[]
}
