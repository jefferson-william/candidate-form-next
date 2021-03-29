import { screen } from '~/__stubs__/utils/test-utils'

export function getAllWhereDidYouWorkInput() {
  return screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })
}

export function getAllByRemoveWhereDidWorkIconButton() {
  return screen.getAllByRole('button', { name: 'Remover' })
}
