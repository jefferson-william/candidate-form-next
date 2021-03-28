import { render, waitFor, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getStore from '~/__stubs__/utils/test-utils/get-store'
import Providers from '~/__stubs__/utils/test-utils/Providers'
import theme from '~/styles/theme'
import { MyRenderOptions, MyRenderedOptions } from '~/types/__stubs__/test-utils'

export const myRender = async (
  Component: any,
  options?: MyRenderOptions
): Promise<[RenderResult, MyRenderedOptions]> => {
  const allOptions = {
    ...options,
  }

  allOptions.theme = options?.theme || theme

  const myStore = getStore(allOptions)

  const rendered = render(Component, {
    wrapper: Providers(myStore, allOptions),
  })

  await waitFor(() => rendered.container.querySelector('body'))

  return [rendered, { store: myStore, ...allOptions }]
}

export * from '@testing-library/react'

export { myRender as render, userEvent }
