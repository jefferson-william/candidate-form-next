import { getAllWhereDidYouWorkInput } from '~/__stubs__/components/AddInformationFieldsStub/selectors'
import { MyRenderResult, screen, userEvent } from '~/__stubs__/utils/test-utils'

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

export async function populateWhereDidYouWorkForm(wrapper: MyRenderResult) {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  await wrapper.findByInputName('whereDidYouWork[1]')

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}
