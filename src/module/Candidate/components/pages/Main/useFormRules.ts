import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as CandidateActions from '~/module/Candidate/store/actions'
import { DataProps } from '~/shared/data'
import { UseFormRulesProps } from './useFormRules.d'

const useFormRules = ({ lastPanel, formData }: UseFormRulesProps) => {
  const dispatch = useDispatch()

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

  const onSubmit = useCallback(
    (values: DataProps) => {
      const canMoveForward = !lastPanel

      const panelIndex = canMoveForward ? formData.panelIndex + 1 : formData.panelIndex

      dispatch(CandidateActions.setFormData({ ...formData, ...values, panelIndex }))
    },
    [lastPanel, formData]
  )

  return {
    setWhereDidYouWork,
    setKnowledge,
    onSubmit,
  }
}

export default useFormRules
