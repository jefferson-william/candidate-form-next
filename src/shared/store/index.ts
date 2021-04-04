/* eslint-disable global-require */
import { createWrapper } from 'next-redux-wrapper'
import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { PersistConfig, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '~/shared/store/rootReducer'
import rootSaga from '~/shared/store/rootSaga'
import rootStates from '~/shared/store/rootStates'
import States from '~/shared/store/rootStates.d'

const isClient = typeof window !== 'undefined'

export const store = (initialState: States = rootStates) => {
  let myStore

  const sagaMiddleware = createSagaMiddleware()

  const middlewares = applyMiddleware(sagaMiddleware)

  if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig: PersistConfig<any> = {
      key: 'root',
      storage,
      whitelist: ['Candidate'],
    }

    myStore = createReduxStore<States, any, any, any>(
      persistReducer(persistConfig, rootReducer),
      initialState,
      middlewares
    )

    // eslint-disable-next-line no-underscore-dangle
    myStore.__PERSISTOR = persistStore(myStore) as any
  } else {
    myStore = createReduxStore<States, any, any, States>(rootReducer, middlewares)
  }

  myStore.sagaTask = sagaMiddleware.run(rootSaga)

  return myStore
}

const wrapperStore = createWrapper<States>(store as any, { debug: process.env.NODE_ENV === 'development' })

export default wrapperStore
