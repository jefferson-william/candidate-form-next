import { Control, FieldValues } from 'react-hook-form'

export interface UseComponentRulesProps {
  name: string
  list: string[]
  control: Control<FieldValues>
  setList(list: string[]): void
}
