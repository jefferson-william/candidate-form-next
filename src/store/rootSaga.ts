import { all } from 'redux-saga/effects'
import Auth from '~/store/Auth/sagas'

export default function* rootSaga() {
  return yield all([Auth])
}
