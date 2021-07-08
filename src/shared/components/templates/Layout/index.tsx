import { FC } from 'react'
import dynamic from 'next/dynamic'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/core/styles'
import GlobalStyles from '~/shared/styles/global'
import { Layout } from './styles'

const HeaderLoader = () => <div className="layout__header-loader" />

const Header = dynamic(() => import('~/module/Candidate/components/molecules/Header'), {
  ssr: false,
  loading: HeaderLoader,
})

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
