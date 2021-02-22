import { FC } from 'react'
import dynamic from 'next/dynamic'

const LinkedInOAuth2PopUp = dynamic(
  async () => {
    const { LinkedInPopUp } = await import('react-linkedin-login-oauth2')

    return LinkedInPopUp
  },
  { ssr: false }
)

const Component: FC = () => <LinkedInOAuth2PopUp />

export default Component
