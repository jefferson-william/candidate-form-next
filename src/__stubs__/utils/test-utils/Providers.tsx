import { Provider } from 'react-redux'
import { RouterContext } from 'next-server/dist/lib/router-context'
import { ThemeProvider } from 'styled-components'
import { Store } from 'redux'
import { MyRenderOptions } from '~/types/__stubs__/test-utils'

const Providers = (myStore: Store<any, any>, allOptions: MyRenderOptions) => ({ children }: any) => (
  <RouterContext.Provider value={allOptions.router as any}>
    <Provider store={myStore}>
      <ThemeProvider theme={allOptions.theme}>{children}</ThemeProvider>
    </Provider>
  </RouterContext.Provider>
)

export default Providers
