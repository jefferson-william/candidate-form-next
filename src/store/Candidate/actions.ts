import { action } from 'typesafe-actions'
import TYPES from '~/store/Candidate/types'
import { DataProps } from '~/types/data'

export const setFormData = (formData: DataProps) => action<string, object>(TYPES.SET_FORM_DATA, { formData })

export const linkedinDataRequest = (code: string) => action<string, string>(TYPES.LINKEDIN_DATA_REQUEST, code)

export const setObtainedUserDataFromLinkedin = (obtainedUserDataFromLinkedin: boolean) =>
  action<string, object>(TYPES.SET_OBTAINED_USER_DATA_FROM_LINKEDIN, { obtainedUserDataFromLinkedin })
