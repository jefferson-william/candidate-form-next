import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { Button, Card, FormControl, Input, InputLabel, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import axios from 'axios'
import linkedinImage from '~/assets/images/linkedin.png'
import AddInformationFields from '~/components/AddInformationFields'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { Main } from '~/styles/pages/main'
import { DataProps } from '~/types/data'
import { LinkedinUserProps, LinkedinSuccessAuthorizationTokenProps } from '~/types/data/LinkedIn'

const LinkedIn = dynamic<any>(() => import('react-linkedin-login-oauth2'), { ssr: false })

const Component: React.FC = () => {
  const [linkedinAuthorizationToken, setLinkedinAuthorizationToken] = useState<string>('')
  const [linkedinUserData, setLinkedinUserData] = useState<LinkedinUserProps | object>({})
  const [knowledgeList, setKnowledgeList] = useState<number[]>([0])
  const [whereDidYouWorkList, setWhereDidYouWorkList] = useState<number[]>([0])
  const [data, setData] = useState<Partial<DataProps>>({})
  const [panelIndex, setPanelIndex] = useState<number>(0)
  const theme = useTheme()
  const { register, handleSubmit } = useForm()

  const a11yProps = useCallback(
    (index: number) => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }),
    []
  )

  const firstPanel = useMemo(() => panelIndex === 0, [panelIndex])

  const lastPanel = useMemo(() => panelIndex === 2, [panelIndex])

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => setPanelIndex(newValue), [])

  const handleBack = useCallback(() => setPanelIndex(panelIndex - 1), [panelIndex])

  const onSubmit = useCallback(
    (values: Partial<DataProps>) => {
      const canMoveForward = !lastPanel

      if (canMoveForward) {
        setPanelIndex(panelIndex + 1)
      }

      setData(Object.assign(data, values))
    },
    [lastPanel, panelIndex, data]
  )

  const handleLinkedinSuccess = useCallback(
    async ({ code }: LinkedinSuccessAuthorizationTokenProps) => {
      setLinkedinAuthorizationToken(code)

      const response = await axios.post<LinkedinUserProps>(`${process.env.NEXT_PUBLIC_URL}/api/linkedin/callback`, {
        code,
      })

      setLinkedinUserData(response.data)
    },
    [linkedinAuthorizationToken, linkedinUserData]
  )

  const handleLinkedinFailure = useCallback(() => setLinkedinAuthorizationToken(''), [])

  return (
    <Layout>
      <Main maxWidth="sm">
        <Tabs className="main__tabs" value={panelIndex} onChange={handleChange} aria-label="Perguntas">
          <Tab label="Dados básicos" {...a11yProps(0)} />
          <Tab label="Onde já trabalhou" {...a11yProps(1)} />
          <Tab label="Conhecimentos" {...a11yProps(2)} />
        </Tabs>
        <div className="main__linkedin-area">
          <Typography className="main__linkedin-text" variant="caption">
            Click para preencher automaticamente
          </Typography>
          {typeof window !== 'undefined' && (
            <LinkedIn
              clientId={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}
              onSuccess={handleLinkedinSuccess}
              onFailure={handleLinkedinFailure}
              redirectUri={`${process.env.NEXT_PUBLIC_URL}/linkedin`}
              scope={process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SCOPE}
            >
              <img src={linkedinImage} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
            </LinkedIn>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel className="main__tab-panel" value={panelIndex} index={0} dir={theme.direction}>
            <Card className="main__card">
              <FormControl className="main__form-control" required>
                <InputLabel htmlFor="name">Nome completo</InputLabel>
                <Input autoFocus id="name" name="name" inputRef={register({ required: true })} />
              </FormControl>
              <FormControl className="main__form-control" required>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input type="email" id="email" name="email" inputRef={register({ required: true })} />
              </FormControl>
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={panelIndex} index={1} dir={theme.direction}>
            <Card className="main__card">
              <AddInformationFields
                list={whereDidYouWorkList}
                setList={setWhereDidYouWorkList}
                name="whereDidYouWork"
                text="Onde já trabalhou?"
                formControlClass="main__form-control"
                register={register}
              />
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={panelIndex} index={2} dir={theme.direction}>
            <Card className="main__card">
              <AddInformationFields
                list={knowledgeList}
                setList={setKnowledgeList}
                name="knowledge"
                text="Conhecimentos"
                formControlClass="main__form-control"
                register={register}
              />
            </Card>
          </TabPanel>
          <div className="main__actions">
            <Button className="main__button" variant="contained" disabled={firstPanel} onClick={handleBack}>
              Anterior
            </Button>
            <Button className="main__button" type="submit" variant="contained" color="primary">
              {lastPanel ? 'Enviar' : 'Próximo'}
            </Button>
          </div>
        </form>
      </Main>
    </Layout>
  )
}

export default Component
