import { getAllKnowledgeInput } from '~/__stubs__/pages/main/selectors'
import { MyRenderResult, screen, userEvent } from '~/__stubs__/utils/test-utils'

export function clickNextButton() {
  userEvent.click(screen.getByRole('button', { name: 'Próximo' }))
}

export function clickSendButton() {
  userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
}

export function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))
}

export function populateBasicDataForm() {
  userEvent.type(screen.getByRole('textbox', { name: 'Nome completo' }), 'Steve Jobs')
  userEvent.type(screen.getByRole('textbox', { name: 'E-mail' }), 'steve.jobs@email.com')
}

export async function populateKnowledgeForm(wrapper: MyRenderResult) {
  userEvent.type(getAllKnowledgeInput()[0], 'NodeJS')

  clickWhereDidWorkAddButton()

  await wrapper.findByInputName('knowledge[1]')

  userEvent.type(getAllKnowledgeInput()[1], 'React')
}
