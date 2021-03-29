import { getAllWhereDidYouWorkInput } from '~/__stubs__/components/AddInformationFieldsStub/selectors'
import { screen, userEvent } from '~/__stubs__/utils/test-utils'

export function clickNextButton() {
  userEvent.click(screen.getByRole('button', { name: 'Próximo' }))
}

export function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))
}

export function populateBasicDataForm() {
  userEvent.type(screen.getByRole('textbox', { name: 'Nome completo' }), 'Steve Jobs')
  userEvent.type(screen.getByRole('textbox', { name: 'E-mail' }), 'steve.jobs@email.com')
}

export function populateWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}
