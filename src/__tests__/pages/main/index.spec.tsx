import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { RouterContext } from 'next-server/dist/lib/router-context'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { camelcase } from '~/__mocks__/store/Repo/sagas'
import Main from '~/pages/main'
import configureStore from '~/store'

import '~/__mocks__/nextRouter'

describe('pages/main', () => {
  beforeEach(() => {
    const route = 'https://api.github.com/users/jefferson-william/repos'
    const moxios = new MockAdapter(axios)

    moxios.onGet(route).reply(200, camelcase)
  })

  it('render', async () => {
    const makeStore = {}
    const store = configureStore(makeStore, { isServer: false, req: undefined })
    const router: any = {
      pathname: 'main',
    }

    const { getByTestId, getAllByTestId } = render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <Main />
        </Provider>
      </RouterContext.Provider>
    )

    await waitFor(() => getAllByTestId('li'))

    act(() => {
      expect(getByTestId('logo')).toBeInTheDocument()
      expect(getAllByTestId('li')).toHaveLength(2)
    })
  })
})