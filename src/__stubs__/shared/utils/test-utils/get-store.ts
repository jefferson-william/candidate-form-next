import { Store } from 'redux'
import { MyRenderOptions } from '~/__stubs__/shared/utils/test-utils/index.d'
import { store } from '~/shared/store'
import rootStates from '~/shared/store/rootStates'

const getStore = (options: MyRenderOptions): Store<any, any> => {
  const state = options.initialState || rootStates

  return (options?.store && options!.store(state)) || store(state)
}

export default getStore
