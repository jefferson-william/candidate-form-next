import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as CandidateActions from '~/module/Candidate/store/actions'
import { DataProps } from '~/shared/data'
import { LinkedinSuccessAuthorizationTokenProps } from '~/shared/data/LinkedIn'
import { UseLinkedinRulesProps } from './useLinkedinRules.d'

const useLinkedinRules = ({
  formData,
  obtainedUserDataFromLinkedin,
  control,
  setLinkedinAuthorizationToken,
}: UseLinkedinRulesProps) => {
  const dispatch = useDispatch()

  const handleLinkedinSuccess = useCallback(
    ({ code }: LinkedinSuccessAuthorizationTokenProps) => {
      setLinkedinAuthorizationToken(code)

      dispatch(CandidateActions.linkedinDataRequest(code))
    },
    [formData]
  )

  const handleLinkedinFailure = useCallback(() => setLinkedinAuthorizationToken(''), [])

  const updateLinkedinUserDataOnForm = useCallback(
    ({ fullName, email }: DataProps) => {
      control.setValue('fullName', fullName)
      control.setValue('email', email)
    },
    [control, formData]
  )

  useEffect(() => {
    updateLinkedinUserDataOnForm(formData)
  }, [obtainedUserDataFromLinkedin])

  return {
    handleLinkedinSuccess,
    handleLinkedinFailure,
  }
}

export default useLinkedinRules
