import React from 'react'
import Image from 'next/image'
import { Container } from '@material-ui/core'
import Logo from '~/shared/assets/images/logo-intera.png'
import { Header } from './styles'

const Component: React.FC = () => (
  <Header className="header" elevation={4}>
    <Container>
      <Image className="header__logo" src={Logo} alt="Logo Intera" width="80" height="13" />
    </Container>
  </Header>
)

export default Component
