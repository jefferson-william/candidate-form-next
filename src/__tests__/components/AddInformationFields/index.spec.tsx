import AddInformationFieldsStub from '~/__stubs__/components/AddInformationFieldsStub'
import {
  populateWhereDidYouWorkForm,
  testAddAndRemoveFieldsOfWhereDidYouWorkForm,
} from '~/__stubs__/components/AddInformationFieldsStub/actions'
import { render, act, RenderResult } from '~/__stubs__/utils/test-utils'
import getFormData from '~/utils/form/get-form-data'

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
