import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import Candidate from '~/module/Candidate/store/reducer'
import States from '~/shared/store/rootStates.d'
import Action from '~/shared/types/lib/typesafe-actions'

export const combinedReducer = combineReducers({
  Candidate,
})

const rootReducer = (state: States | undefined, action: Action<any>) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }

  return combinedReducer(state, action)
}

export default rootReducer
