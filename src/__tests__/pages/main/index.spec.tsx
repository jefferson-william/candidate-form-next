import { RenderResult } from '@testing-library/react'
import { myRender } from '~/__stubs__/render'
import '~/__mocks__/nextRouter'
import Main from '~/pages/main'

describe('pages/main', () => {
  let wrapper: RenderResult

  beforeEach(async () => {
    wrapper = await myRender(<Main />)
  })

  it('should to match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
