import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import * as CandidateActions from '~/store/Candidate/actions'
import { DataProps } from '~/types/data'
import { LinkedinSuccessAuthorizationTokenProps } from '~/types/data/LinkedIn.d'
import States from '~/types/store/rootStates'

interface CandidateSelectorProps {
  formData: DataProps
  obtainedUserDataFromLinkedin: boolean
}

const useMainPage = () => {
  const dispatch = useDispatch()
  const { formData, obtainedUserDataFromLinkedin } = useSelector<States, CandidateSelectorProps>((state) => ({
    formData: state.Candidate.formData,
    obtainedUserDataFromLinkedin: state.Candidate.obtainedUserDataFromLinkedin,
  }))
  const [, setLinkedinAuthorizationToken] = useState<string>('')
  const theme = useTheme()
  const { register, handleSubmit, control } = useForm()

  const firstPanel = useMemo(() => formData.panelIndex === 0, [formData.panelIndex])

  const lastPanel = useMemo(() => formData.panelIndex === 2, [formData.panelIndex])

  const setWhereDidYouWork = useCallback(
    (whereDidYouWork: string[]) => {
      dispatch(CandidateActions.setFormData({ ...formData, whereDidYouWork }))
    },
    [formData]
  )

  const setKnowledge = useCallback(
    (knowledge) => {
      dispatch(CandidateActions.setFormData({ ...formData, knowledge }))
    },
    [formData]
  )

  const setPanelIndex = useCallback(
    (panelIndex) => {
      dispatch(CandidateActions.setFormData({ ...formData, panelIndex }))
    },
    [formData]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, panelIndexChanged: number) => {
      setPanelIndex(panelIndexChanged)

      return event
    },
    [formData]
  )

  const handleBack = useCallback(() => {
    setPanelIndex(formData.panelIndex - 1)
  }, [formData])

  const onSubmit = useCallback(
    (values: DataProps) => {
      const canMoveForward = !lastPanel

      const panelIndex = canMoveForward ? formData.panelIndex + 1 : formData.panelIndex

      dispatch(CandidateActions.setFormData({ ...formData, ...values, panelIndex }))
    },
    [lastPanel, formData]
  )

  const updateLinkedinUserDataOnForm = useCallback(
    ({ fullName, email }: DataProps) => {
      control.setValue('fullName', fullName)
      control.setValue('email', email)
    },
    [control, formData]
  )

  const handleLinkedinSuccess = useCallback(
    ({ code }: LinkedinSuccessAuthorizationTokenProps) => {
      setLinkedinAuthorizationToken(code)

      dispatch(CandidateActions.linkedinDataRequest(code))
    },
    [formData]
  )

  const handleLinkedinFailure = useCallback(() => setLinkedinAuthorizationToken(''), [])

  useEffect(() => {
    updateLinkedinUserDataOnForm(formData)
  }, [obtainedUserDataFromLinkedin])

  return {
    theme,
    firstPanel,
    formData,
    control,
    register,
    handleSubmit,
    setWhereDidYouWork,
    setKnowledge,
    handleChange,
    handleBack,
    onSubmit,
    handleLinkedinSuccess,
    handleLinkedinFailure,
  }
}

export default useMainPage
