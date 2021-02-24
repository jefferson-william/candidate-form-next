import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { DataProps } from '~/types/data'
import {
  LinkedinSuccessAccessTokenProps,
  LinkedinRetrieveMePictureProps,
  LinkedinMeProps,
  LinkedinMeEmailProps,
} from '~/types/data/LinkedIn'

export default async function handler(request: NextApiRequest, response: NextApiResponse<Partial<DataProps> | object>) {
  if (request.method !== 'POST') {
    response.status(500)

    return
  }

  const { code } = request.body

  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/linkedin`,
    client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  } as any)

  try {
    const responseAuthorizationToken = await axios.post<LinkedinSuccessAccessTokenProps>(
      process.env.LINKEDIN_API_ACCESS_TOKEN as string,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const headers = {
      headers: { Authorization: `Bearer ${responseAuthorizationToken.data.access_token}` },
    }

    const responseAccessToken = await axios.get<LinkedinMeProps>(process.env.LINKEDIN_API_ME as string, headers)

    const responseRetrieveMePicture = await axios.get<LinkedinRetrieveMePictureProps>(
      process.env.LINKEDIN_API_RETRIEVE_ME_PICTURE as string,
      headers
    )

    const responseRetrieveMeEmail = await axios.get<LinkedinMeEmailProps>(
      process.env.LINKEDIN_API_RETRIEVE_ME_EMAIL as string,
      headers
    )

    const firstName = responseAccessToken.data.localizedFirstName
    const lastName = responseAccessToken.data.localizedLastName
    const fullName = `${firstName} ${lastName}`
    const picture = responseRetrieveMePicture.data.profilePicture['displayImage~'].elements[0].identifiers[0].identifier
    const email = responseRetrieveMeEmail.data.elements[0]['handle~'].emailAddress

    const data = {
      fullName,
      picture,
      email,
    }

    response.status(200).json(data)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}
