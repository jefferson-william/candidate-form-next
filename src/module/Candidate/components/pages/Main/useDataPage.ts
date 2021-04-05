import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import { CandidateSelectorProps } from '~/module/Candidate/components/pages/Main/useDataPage.d'
import States from '~/shared/store/rootStates.d'

const useDataPage = () => {
  const theme = useTheme()
  const { register, handleSubmit, control } = useForm()
  const { formData, obtainedUserDataFromLinkedin } = useSelector<States, CandidateSelectorProps>((state) => ({
    formData: state.Candidate.formData,
    obtainedUserDataFromLinkedin: state.Candidate.obtainedUserDataFromLinkedin,
  }))
  const [, setLinkedinAuthorizationToken] = useState<string>('')

  const firstPanel = useMemo(() => formData.panelIndex === 0, [formData.panelIndex])

  const lastPanel = useMemo(() => formData.panelIndex === 2, [formData.panelIndex])

  return {
    theme,
    firstPanel,
    lastPanel,
    formData,
    obtainedUserDataFromLinkedin,
    control,
    register,
    handleSubmit,
    setLinkedinAuthorizationToken,
  }
}

export default useDataPage
