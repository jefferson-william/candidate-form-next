import { produce } from 'immer'
import { Reducer } from 'redux'
import { INITIAL_STATE } from '~/module/Candidate/store/state'
import TYPES from '~/module/Candidate/store/types'
import Action from '~/shared/types/lib/typesafe-actions'
import State from './state.d'

const reducer: Reducer<State, Action<State>> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_FORM_DATA:
      return produce(state, (draft: State) => {
        draft.formData = action.payload.formData
      })

    case TYPES.SET_OBTAINED_USER_DATA_FROM_LINKEDIN:
      return produce(state, (draft: State) => {
        draft.obtainedUserDataFromLinkedin = action.payload.obtainedUserDataFromLinkedin
      })

    default:
      return state
  }
}

export default reducer
