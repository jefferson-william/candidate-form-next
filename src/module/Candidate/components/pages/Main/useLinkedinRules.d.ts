import { Control, FieldValues } from 'react-hook-form'
import { DataProps } from '~/types/data'

export interface UseLinkedinRulesProps {
  formData: DataProps
  obtainedUserDataFromLinkedin: boolean
  control: Control<FieldValues>
  setLinkedinAuthorizationToken(code: string): void
}
