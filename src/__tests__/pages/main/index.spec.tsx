import { render, act, MyRenderResult, waitForElementToBeRemoved, screen, userEvent } from '~/__stubs__/utils/test-utils'
import Main from '~/pages/main'
import '~/__mocks__/nextRouter'
import { MyRenderedOptions } from '~/types/__stubs__/test-utils'

describe('pages/main', () => {
  let wrapper: MyRenderResult
  let options: MyRenderedOptions

  beforeEach(async () => {
    ;[wrapper, options] = await render(<Main />)
  })

  it('should to match snapshot', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should be able to perform the entire flow of filling out the form', async () => {
    await act(async () => {
      userEvent.type(screen.getByRole('textbox', { name: 'Nome completo' }), 'Steve Jobs')
      userEvent.type(screen.getByRole('textbox', { name: 'E-mail' }), 'steve.jobs@email.com')

      userEvent.click(screen.getByRole('button', { name: 'Próximo' }))

      await screen.findByRole('textbox', { name: 'Onde já trabalhou?' })

      userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[0], 'Amazon')

      userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

      await wrapper.findByInputName('whereDidYouWork[1]')

      userEvent.type(screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[1], 'Yahoo')

      userEvent.click(screen.getByRole('button', { name: 'Próximo' }))

      await waitForElementToBeRemoved(() => screen.getAllByRole('textbox', { name: 'Onde já trabalhou?' })[0])

      await screen.findByRole('textbox', { name: 'Conhecimentos' })

      userEvent.type(screen.getAllByRole('textbox', { name: 'Conhecimentos' })[0], 'NodeJS')

      userEvent.click(screen.getByRole('button', { name: 'Adicionar' }))

      await wrapper.findByInputName('knowledge[1]')

      userEvent.type(screen.getAllByRole('textbox', { name: 'Conhecimentos' })[1], 'React')

      userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    })

    expect(options.store.getState().Candidate.formData).toEqual({
      fullName: 'Steve Jobs',
      email: 'steve.jobs@email.com',
      whereDidYouWork: ['Amazon', 'Yahoo'],
      knowledge: ['NodeJS', 'React'],
      panelIndex: 2,
      picture: '',
    })
  })
})
