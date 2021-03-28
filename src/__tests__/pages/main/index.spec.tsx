import { render, userEvent, act, RenderResult, screen, waitForElementToBeRemoved } from '~/__stubs__/test-utils'
import Main from '~/pages/main'
import '~/__mocks__/nextRouter'

function clickNextButton() {
  userEvent.click(screen.getByRole('button', { name: 'Próximo' }))
}

function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))
}

function getAllWhereDidYouWorkInput() {
  return screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })
}

function getAllByRemoveWhereDidWorkIconButton() {
  return screen.getAllByRole('button', { name: 'Remover' })
}

function populateBasicDataForm() {
  userEvent.type(screen.getByRole('textbox', { name: 'Nome completo' }), 'Steve Jobs')
  userEvent.type(screen.getByRole('textbox', { name: 'E-mail' }), 'steve.jobs@email.com')
}

function testAddAndRemoveFieldsOfWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Remessa Online')

  clickWhereDidWorkAddButton()

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Google')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[0])

  clickWhereDidWorkAddButton()

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Microsoft')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[1])

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[0])
}

function populateWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}

describe('pages/main', () => {
  let wrapper: RenderResult

  beforeEach(async () => {
    ;[wrapper] = await render(<Main />)
  })

  it('should to match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should fill in all fields correctly', async () => {
    await act(async () => {
      populateBasicDataForm()

      clickNextButton()

      await screen.findByRole('textbox', { name: 'Onde já trabalhou?' })

      testAddAndRemoveFieldsOfWhereDidYouWorkForm()

      populateWhereDidYouWorkForm()

      clickNextButton()

      await waitForElementToBeRemoved(() => getAllWhereDidYouWorkInput()[0])

      await screen.findByRole('textbox', { name: 'Conhecimentos' })
    })
  })
})
