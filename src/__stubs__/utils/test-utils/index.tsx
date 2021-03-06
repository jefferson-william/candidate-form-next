import { render, waitFor, queries, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getStore from '~/__stubs__/utils/test-utils/get-store'
import Providers from '~/__stubs__/utils/test-utils/Providers'
import theme from '~/styles/theme'
import { MyRenderOptions, MyRenderedOptions } from '~/types/__stubs__/test-utils'
import customQueries, { MyQueries } from './custom-queries'

export const myRender = async (
  Component: any,
  options?: MyRenderOptions
): Promise<[MyRenderResult, MyRenderedOptions]> => {
  const allOptions = {
    ...options,
  }

  allOptions.theme = options?.theme || theme

  const myStore = getStore(allOptions)

  const rendered = render<MyQueries, HTMLElement>(Component, {
    wrapper: Providers(myStore, allOptions),
    queries: { ...queries, ...customQueries } as MyQueries,
  })

  await waitFor(() => rendered.container.querySelector('body'))

  return [rendered, { store: myStore, ...allOptions }]
}

export * from '@testing-library/react'

export type MyRenderResult = RenderResult<MyQueries, HTMLElement>

export { myRender as render, userEvent }
