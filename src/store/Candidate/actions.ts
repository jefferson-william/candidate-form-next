import { action } from 'typesafe-actions'
import TYPES from '~/store/Candidate/types'
import { SetFormDataProps } from '~/types/store/Candidate/action'

export const setFormData = ({ formData }: SetFormDataProps) =>
  action<string, SetFormDataProps>(TYPES.SET_FORM_DATA, { formData })

export const linkedinDataRequest = (code: string) => action<string, string>(TYPES.LINKEDIN_DATA_REQUEST, code)
