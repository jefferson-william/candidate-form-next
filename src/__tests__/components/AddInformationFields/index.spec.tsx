import AddInformationFieldsStub from '~/__stubs__/components/AddInformationFieldsStub'
import { render, userEvent, act, RenderResult, screen, waitFor } from '~/__stubs__/utils/test-utils'
import getFormData from '~/utils/form/get-form-data'

function clickWhereDidWorkAddButton() {
  userEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0])
}

function getAllWhereDidYouWorkInput() {
  return screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })
}

function getAllByRemoveWhereDidWorkIconButton() {
  return screen.getAllByRole('button', { name: 'Remover' })
}

async function testAddAndRemoveFieldsOfWhereDidYouWorkForm() {
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

async function populateWhereDidYouWorkForm() {
  userEvent.type(getAllWhereDidYouWorkInput()[0], 'Amazon')

  clickWhereDidWorkAddButton()

  await waitFor(() => expect(getAllWhereDidYouWorkInput()[1]).toBeInTheDocument())

  userEvent.type(getAllWhereDidYouWorkInput()[1], 'Yahoo')
}

describe('components/AddInformationFields', () => {
  let wrapper: RenderResult

  describe('when not have default params', () => {
    beforeEach(async () => {
      ;[wrapper] = await render(<AddInformationFieldsStub defaultValues={[]} defaultList={[0]} />)
    })

    it('should to match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot()
    })

    describe('when test behavior', () => {
      it('all interactions should work', async () => {
        await act(async () => {
          await testAddAndRemoveFieldsOfWhereDidYouWorkForm()
        })
      })
    })

    describe('when fill in all fields correctly', () => {
      it('should return all the values filled in', async () => {
        await act(async () => {
          await populateWhereDidYouWorkForm()

          expect(getFormData(wrapper.container.querySelector('form') as HTMLFormElement)).toMatchObject({
            'whereDidYouWork[0]': 'Amazon',
            'whereDidYouWork[1]': 'Yahoo',
          })
        })
      })
    })
  })

  describe('when have two default params', () => {
    beforeEach(async () => {
      ;[wrapper] = await render(
        <AddInformationFieldsStub defaultValues={['Google', 'Microsoft']} defaultList={[0, 1]} />
      )
    })

    it('should to match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot()
    })
  })
})
