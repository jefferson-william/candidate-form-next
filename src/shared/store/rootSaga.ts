import { all } from 'redux-saga/effects'
import Candidate from '~/module/Candidate/store/sagas'

export default function* rootSaga(): any {
  return yield all([Candidate])
}
