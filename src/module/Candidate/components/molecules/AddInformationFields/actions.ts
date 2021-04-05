import {
  getAllByRemoveWhereDidWorkIconButton,
  getAllWhereDidYouWorkInput,
} from '~/module/Candidate/components/molecules/AddInformationFields/selectors'
import { MyRenderResult, screen, userEvent } from '~/shared/utils/test-utils'

export function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0])
}

export async function testAddAndRemoveFieldsOfWhereDidYouWorkForm(wrapper: MyRenderResult) {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Remessa Online')

  clickWhereDidWorkAddButton()

  await wrapper.findByInputName('whereDidYouWork[1]')

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Google')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[0])

  clickWhereDidWorkAddButton()

  await wrapper.findByInputName('whereDidYouWork[1]')

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Microsoft')

  userEvent.click(getAllByRemoveWhereDidWorkIconButton()[1])

  userEvent.type(getAllWhereDidYouWorkInput()[0], '')
}

export async function populateWhereDidYouWorkForm(wrapper: MyRenderResult) {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  await wrapper.findByInputName('whereDidYouWork[1]')

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}
