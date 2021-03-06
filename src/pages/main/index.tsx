import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Experiment, Variant } from 'react-optimize'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Avatar, Button, Card, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import linkedinImage from '~/assets/images/linkedin.png'
import AddInformationFields from '~/components/AddInformationFields'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { LINKEDIN_IS_SHOW_VARIATION, OPTIMIZE_EXPERIMENTS } from '~/constants/experiments'
import * as CandidateActions from '~/store/Candidate/actions'
import { Main } from '~/styles/pages/main'
import { DataProps } from '~/types/data'
import { LinkedinSuccessAuthorizationTokenProps } from '~/types/data/LinkedIn.d'
import States from '~/types/store/rootStates'

const LinkedIn = dynamic<any>(() => import('react-linkedin-login-oauth2'), { ssr: false })

interface CandidateSelectorProps {
  formData: DataProps
  obtainedUserDataFromLinkedin: boolean
}

const Component: React.FC = () => {
  const dispatch = useDispatch()
  const { formData, obtainedUserDataFromLinkedin } = useSelector<States, CandidateSelectorProps>((state) => ({
    formData: state.Candidate.formData,
    obtainedUserDataFromLinkedin: state.Candidate.obtainedUserDataFromLinkedin,
  }))
  const [, setLinkedinAuthorizationToken] = useState<string>('')
  const theme = useTheme()
  const { register, handleSubmit, control } = useForm()

  const a11yProps = useCallback(
    (index: number) => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }),
    []
  )

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

  return (
    <Layout>
      <Main maxWidth="sm">
        <Experiment id={OPTIMIZE_EXPERIMENTS.LINKEDIN_IS_SHOW}>
          <Variant id={LINKEDIN_IS_SHOW_VARIATION.Test}>
            <Tabs className="main__tabs" value={formData.panelIndex} onChange={handleChange} aria-label="Perguntas">
              <Tab label="Dados básicos" {...a11yProps(0)} />
              <Tab label="Onde já trabalhou" {...a11yProps(1)} />
              <Tab label="Conhecimentos" {...a11yProps(2)} />
            </Tabs>
          </Variant>
        </Experiment>
        <div className="main__linkedin-area">
          <Typography className="main__linkedin-text" variant="caption">
            Clique para preencher automaticamente
          </Typography>
          <LinkedIn
            clientId={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}
            onSuccess={handleLinkedinSuccess}
            onFailure={handleLinkedinFailure}
            redirectUri={`${process.env.NEXT_PUBLIC_URL}/linkedin`}
            scope={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SCOPE}
          >
            <Image
              src={linkedinImage}
              alt="Log in with Linked In"
              width="180"
              height="33"
              className="main__linkedin-image"
            />
          </LinkedIn>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel className="main__tab-panel" value={formData.panelIndex} index={0} dir={theme.direction}>
            <Card className="main__card">
              <Avatar
                className="main__avatar"
                alt="Foto do usuário"
                src={formData.picture}
                imgProps={{ width: 40, height: 40 }}
              />
              <TextField
                id="fullName"
                name="fullName"
                label="Nome completo"
                className="main__form-control"
                defaultValue={formData.fullName}
                inputRef={register({ required: true })}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="E-mail"
                className="main__form-control"
                defaultValue={formData.email}
                inputRef={register({ required: true })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={formData.panelIndex} index={1} dir={theme.direction}>
            <Card className="main__card">
              <AddInformationFields
                list={formData.whereDidYouWork}
                name="whereDidYouWork"
                text="Onde já trabalhou?"
                control={control}
                setList={setWhereDidYouWork}
                register={register}
                formControlClass="main__form-control"
              />
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={formData.panelIndex} index={2} dir={theme.direction}>
            <Card className="main__card">
              <AddInformationFields
                list={formData.knowledge}
                name="knowledge"
                text="Conhecimentos"
                control={control}
                setList={setKnowledge}
                register={register}
                formControlClass="main__form-control"
              />
            </Card>
          </TabPanel>
          <div className="main__actions">
            <Button className="main__button" variant="contained" disabled={firstPanel} onClick={handleBack}>
              Anterior
            </Button>
            <Button className="main__button" type="submit" variant="contained" color="primary">
              {formData.panelIndex === 2 ? 'Enviar' : 'Próximo'}
            </Button>
          </div>
        </form>
      </Main>
    </Layout>
  )
}

export default Component
