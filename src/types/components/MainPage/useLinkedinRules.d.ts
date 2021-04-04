import { DataProps } from '~/types/data'
import { Control, FieldValues } from 'react-hook-form'

export interface UseLinkedinRulesProps {
  formData: DataProps
  obtainedUserDataFromLinkedin: boolean
  control: Control<FieldValues>
  setLinkedinAuthorizationToken(code: string): void
}
