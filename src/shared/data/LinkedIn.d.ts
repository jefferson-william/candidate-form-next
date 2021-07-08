export interface LinkedinSuccessAuthorizationTokenProps {
  code: string
}

export interface LinkedinSuccessAccessTokenProps {
  access_token: string
  expires_in: string
}

export interface LinkedinDisplayImageElementsIdentifiersProps {
  identifier: string
  mediaType: string
  identifierExpiresInSeconds: number
}

export interface LinkedinDisplayImageElementsProps {
  artifact: string
  authorizationMethod: string
  identifiers: LinkedinDisplayImageElementsIdentifiersProps[]
}

export interface LinkedinRetrieveMePictureProps {
  profilePicture: {
    'displayImage~': {
      elements: LinkedinDisplayImageElementsProps[]
    }
  }
}

export interface LinkedinMeProps {
  localizedLastName: string
  localizedFirstName: string
}

export interface LinkedinMeEmailElementsProps {
  'handle~': {
    emailAddress: string
  }
}

export interface LinkedinMeEmailProps {
  elements: LinkedinMeEmailElementsProps[]
}

export interface LinkedinUserProps {
  firstName: string
  lastName: string
  fullName: string
  picture: string
  email: string
}
