import { Store } from 'redux'
import { store } from '~/store'
import rootStates from '~/store/rootStates'
import { MyRenderOptions } from '~/types/__stubs__/test-utils'

const getStore = (options: MyRenderOptions): Store<any, any> => {
  const state = options.initialState || rootStates

  return (options?.store && options!.store(state)) || store(state)
}

export default getStore
