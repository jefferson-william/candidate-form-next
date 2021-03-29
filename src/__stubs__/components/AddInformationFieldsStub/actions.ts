import {
  getAllByRemoveWhereDidWorkIconButton,
  getAllWhereDidYouWorkInput,
} from '~/__stubs__/components/AddInformationFieldsStub/selectors'
import { screen, userEvent, waitFor } from '~/__stubs__/utils/test-utils'

export function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0])
}

export async function testAddAndRemoveFieldsOfWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Remessa Online')

  clickWhereDidWorkAddButton()

  await waitFor(() => expect(getAllWhereDidYouWorkInput()[1]).toBeInTheDocument())

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Google')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[0])

  clickWhereDidWorkAddButton()

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Microsoft')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[1])

  userEvent.type(getAllWhereDidYouWorkInput()[0], '')
}

export async function populateWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  await waitFor(() => expect(getAllWhereDidYouWorkInput()[1]).toBeInTheDocument())

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}
