/* eslint-disable no-underscore-dangle */
import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import { PersistGate } from 'redux-persist/integration/react'
import wrapperStore from '~/store'
import theme from '~/styles/theme'

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  const store: any = useStore()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Component {...pageProps} {...router} />
        </PersistGate>
      </ThemeProvider>
    </>
  )
}

export default wrapperStore.withRedux(MyApp)
