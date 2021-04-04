import AddInformationFieldsStub from '~/__stubs__/module/Candidate/molecules/AddInformationFieldsStub'
import {
  populateWhereDidYouWorkForm,
  testAddAndRemoveFieldsOfWhereDidYouWorkForm,
} from '~/__stubs__/module/Candidate/molecules/AddInformationFieldsStub/actions'
import { render, act, MyRenderResult } from '~/__stubs__/shared/utils/test-utils'
import getFormData from '~/shared/utils/form/get-form-data'

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
          await testAddAndRemoveFieldsOfWhereDidYouWorkForm(wrapper)
        })
      })
    })

    describe('when fill in all fields correctly', () => {
      it('should return all the values filled in', async () => {
        await act(async () => {
          await populateWhereDidYouWorkForm(wrapper)

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
