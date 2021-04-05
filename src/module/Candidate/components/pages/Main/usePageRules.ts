import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as CandidateActions from '~/module/Candidate/store/actions'
import { UsePageRulesProps } from './usePageRules.d'

const usePageRules = ({ formData }: UsePageRulesProps) => {
  const dispatch = useDispatch()

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

  return {
    formData,
    handleChange,
    handleBack,
  }
}

export default usePageRules
