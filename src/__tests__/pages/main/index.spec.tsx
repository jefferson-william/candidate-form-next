import { populateWhereDidYouWorkForm } from '~/__stubs__/components/AddInformationFieldsStub/actions'
import {
  findByWhereDidYouWorkInput,
  getAllWhereDidYouWorkInput,
} from '~/__stubs__/components/AddInformationFieldsStub/selectors'
import {
  clickNextButton,
  clickSendButton,
  populateBasicDataForm,
  populateKnowledgeForm,
} from '~/__stubs__/pages/main/actions'
import { findByKnowledgeInput } from '~/__stubs__/pages/main/selectors'
import { render, act, MyRenderResult, waitForElementToBeRemoved } from '~/__stubs__/utils/test-utils'
import Main from '~/pages/main'
import '~/__mocks__/nextRouter'
import { MyRenderedOptions } from '~/types/__stubs__/test-utils'

describe('pages/main', () => {
  let wrapper: MyRenderResult
  let options: MyRenderedOptions

  beforeEach(async () => {
    ;[wrapper, options] = await render(<Main />)
  })

  it('should to match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should be able to perform the entire flow of filling out the form', async () => {
    await act(async () => {
      populateBasicDataForm()

      clickNextButton()

      await findByWhereDidYouWorkInput()

      await populateWhereDidYouWorkForm(wrapper)

      clickNextButton()

      await waitForElementToBeRemoved(() => getAllWhereDidYouWorkInput()[0])

      await findByKnowledgeInput()

      await populateKnowledgeForm(wrapper)

      clickSendButton()
    })

    expect(options.store.getState().Candidate.formData).toEqual({
      fullName: 'Steve Jobs',
      email: 'steve.jobs@email.com',
      whereDidYouWork: ['Amazon', 'Yahoo'],
      knowledge: ['NodeJS', 'React'],
      panelIndex: 2,
      picture: '',
    })
  })
})
