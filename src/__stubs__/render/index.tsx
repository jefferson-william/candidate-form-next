import { Provider } from 'react-redux'
import { RouterContext } from 'next-server/dist/lib/router-context'
import { Router } from 'next/router'
import { ThemeProvider } from 'styled-components'
import { Theme } from '@material-ui/core'
import { render, waitFor } from '@testing-library/react'
import { store } from '~/store'
import theme from '~/styles/theme'

interface MyRenderOptions {
  router?: Partial<Router>
  theme?: Theme
  store?: any
}

export const myRender = async (Component: any, options?: MyRenderOptions) => {
  const allOptions = {
    ...options,
  }

  allOptions.theme = options?.theme || theme
  allOptions.store = options?.store || store()

  const rendered = render(
    <RouterContext.Provider value={allOptions.router as any}>
      <Provider store={allOptions.store}>
        <ThemeProvider theme={allOptions.theme}>{Component}</ThemeProvider>
      </Provider>
    </RouterContext.Provider>
  )

  await waitFor(() => rendered.container.querySelector('body'))

  return rendered
}
