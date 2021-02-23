/* eslint-disable global-require */
import { createWrapper } from 'next-redux-wrapper'
import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { PersistConfig, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '~/store/rootReducer'
import rootSaga from '~/store/rootSaga'
import States from '~/types/store/rootStates'

const isClient = typeof window !== 'undefined'

export const store = () => {
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

    myStore = createReduxStore<States, any, any, any>(persistReducer(persistConfig, rootReducer), middlewares)

    // eslint-disable-next-line no-underscore-dangle
    myStore.__PERSISTOR = persistStore(myStore) as any
  } else {
    myStore = createReduxStore<States, any, any, any>(rootReducer, middlewares)
  }

  myStore.sagaTask = sagaMiddleware.run(rootSaga)

  return myStore
}

const wrapperStore = createWrapper<States>(store, { debug: process.env.NODE_ENV === 'development' })

export default wrapperStore
