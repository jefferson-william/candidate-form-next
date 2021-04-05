import { Store } from 'redux'
import { store } from '~/shared/store'
import rootStates from '~/shared/store/rootStates'
import { MyRenderOptions } from '~/shared/utils/test-utils/index.d'

const getStore = (options: MyRenderOptions): Store<any, any> => {
  const state = options.initialState || rootStates

  return (options?.store && options!.store(state)) || store(state)
}

export default getStore
