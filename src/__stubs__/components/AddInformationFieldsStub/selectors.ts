import { screen } from '~/__stubs__/utils/test-utils'

export function findByWhereDidYouWorkInput() {
  return screen.findByRole('textbox', { name: 'Onde já trabalhou?' })
}

export function getAllWhereDidYouWorkInput() {
  return screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })
}

export function getAllByRemoveWhereDidWorkIconButton() {
  return screen.getAllByRole('button', { name: 'Remover' })
}
