import AddInformationFieldsStub from '~/__stubs__/components/AddInformationFieldsStub'
import { render, act, MyRenderResult, userEvent, screen } from '~/__stubs__/utils/test-utils'
import getFormData from '~/utils/form/get-form-data'

describe('components/AddInformationFields', () => {
  let wrapper: MyRenderResult

  describe('when not have default params', () => {
    beforeEach(async () => {
      ;[wrapper] = await render(<AddInformationFieldsStub list={['']} />)
    })

    it('should to match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot()
    })

    describe('when test behavior', () => {
      it('all interactions should work', async () => {
        await act(async () => {
          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[0], 'Remessa Online')

          userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

          await wrapper.findByInputName('whereDidYouWork[1]')

          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[1], 'Google')

          userEvent.click(screen.getAllByRole('button', { name: 'Remover' })[0])

          userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

          await wrapper.findByInputName('whereDidYouWork[1]')

          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[1], 'Microsoft')

          userEvent.click(screen.getAllByRole('button', { name: 'Remover' })[1])

          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[0], '')
        })
      })
    })

    describe('when fill in all fields correctly', () => {
      it('should return all the values filled in', async () => {
        await act(async () => {
          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[0], 'Amazon')

          userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

          await wrapper.findByInputName('whereDidYouWork[1]')

          userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[1], 'Yahoo')

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
      ;[wrapper] = await render(<AddInformationFieldsStub list={['Google', 'Microsoft']} />)
    })

    it('should to match snapshot', () => {
      expect(wrapper.asFragment()).toMatchSnapshot()
    })
  })
})
