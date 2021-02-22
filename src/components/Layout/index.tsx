import { FC } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/core/styles'
import Header from '~/components/Header'
import GlobalStyles from '~/styles/global'
import { Layout } from './styles'

const Component: FC = ({ children }) => (
  <Layout className="layout">
    <CssBaseline />
    <StylesProvider>
      <GlobalStyles />
    </StylesProvider>
    <Header />
    {children}
  </Layout>
)

export default Component
