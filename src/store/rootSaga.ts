import { all } from 'redux-saga/effects'
import Candidate from '~/store/Candidate/sagas'

export default function* rootSaga() {
  return yield all([Candidate])
}
