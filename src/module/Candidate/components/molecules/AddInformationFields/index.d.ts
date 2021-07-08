import { Control, FieldValues } from 'react-hook-form'
import { DataProps } from '~/types/data'

export interface AddInformationFieldsProps {
  list: string[]
  name: string
  text: string
  control: Control<FieldValues>
  setList: any
  register: any
  formControlClass?: string
}
