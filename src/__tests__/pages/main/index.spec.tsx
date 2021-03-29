import { clickNextButton, populateBasicDataForm, populateWhereDidYouWorkForm } from '~/__stubs__/pages/main/actions'
import { getAllWhereDidYouWorkInput } from '~/__stubs__/pages/main/selectors'
import { render, act, RenderResult, screen, waitForElementToBeRemoved } from '~/__stubs__/utils/test-utils'
import Main from '~/pages/main'
import '~/__mocks__/nextRouter'

describe('pages/main', () => {
  let wrapper: RenderResult

  beforeEach(async () => {
    ;[wrapper] = await render(<Main />)
  })

  it('should to match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should be able to perform the entire flow of filling out the form', async () => {
    await act(async () => {
      populateBasicDataForm()

      clickNextButton()

      await screen.findByRole('textbox', { name: 'Onde já trabalhou?' })

      populateWhereDidYouWorkForm()

      clickNextButton()

      await waitForElementToBeRemoved(() => getAllWhereDidYouWorkInput()[0])

      await screen.findByRole('textbox', { name: 'Conhecimentos' })
    })
  })
})
