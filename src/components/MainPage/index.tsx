import { FC } from 'react'
import { Experiment, Variant } from 'react-optimize'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Avatar, Button, Card, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import linkedinImage from '~/assets/images/linkedin.png'
import AddInformationFields from '~/components/AddInformationFields'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { LINKEDIN_IS_SHOW_VARIATION, OPTIMIZE_EXPERIMENTS } from '~/constants/experiments'
import { Main } from '~/styles/pages/main'
import useA11y from './useA11y'
import useDataPage from './useDataPage'
import useFormRules from './useFormRules'
import useLinkedinRules from './useLinkedinRules'
import usePageRules from './usePageRules'

const LinkedIn = dynamic<any>(() => import('react-linkedin-login-oauth2'), { ssr: false })

const MainPage: FC = () => {
  const {
    theme,
    firstPanel,
    lastPanel,
    formData,
    obtainedUserDataFromLinkedin,
    control,
    register,
    handleSubmit,
    setLinkedinAuthorizationToken,
  } = useDataPage()
  const { handleLinkedinSuccess, handleLinkedinFailure } = useLinkedinRules({
    formData,
    control,
    obtainedUserDataFromLinkedin,
    setLinkedinAuthorizationToken,
  })
  const { handleChange, handleBack } = usePageRules({
    formData,
  })
  const { setWhereDidYouWork, setKnowledge, onSubmit } = useFormRules({ lastPanel, formData })
  const { a11yProps } = useA11y()

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

export default MainPage
