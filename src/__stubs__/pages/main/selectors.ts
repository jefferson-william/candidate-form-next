import { screen } from '~/__stubs__/utils/test-utils'

export function findByKnowledgeInput() {
  return screen.findByRole('textbox', { name: 'Conhecimentos' })
}

export function getAllKnowledgeInput() {
  return screen.getAllByRole('textbox', { name: 'Conhecimentos' })
}
