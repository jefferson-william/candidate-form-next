import axios, { AxiosResponse } from 'axios'
import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import * as CandidateActions from '~/store/Candidate/actions'
import TYPES from '~/store/Candidate/types'
import { DataProps } from '~/types/data'
import Action from '~/types/lib/typesafe-actions'
import States from '~/types/store/rootStates'

export function* linkedinDataRequest({ payload: code }: Action<string>) {
  try {
    const response: AxiosResponse<DataProps> = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_URL}/api/linkedin/callback`,
      {
        code,
      }
    )

    const formData = yield select((state: States) => state.Candidate.formData)

    yield put(CandidateActions.setFormData({ ...formData, ...response.data }))

    yield put(CandidateActions.setObtainedUserDataFromLinkedin(true))
  } catch (exception) {
    yield put(CandidateActions.setObtainedUserDataFromLinkedin(false))
  }
}

export default all([takeLatest(TYPES.LINKEDIN_DATA_REQUEST as any, linkedinDataRequest)])
