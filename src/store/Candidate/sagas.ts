import axios, { AxiosResponse } from 'axios'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import { setFormData } from '~/store/Candidate/actions'
import INITIAL_STATE from '~/store/Candidate/state'
import TYPES from '~/store/Candidate/types'
import { DataProps } from '~/types/data'
import Action from '~/types/lib/typesafe-actions'

export function* linkedinDataRequest({ payload: code }: Action<string>) {
  try {
    const response: AxiosResponse<DataProps> = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_URL}/api/linkedin/callback`,
      {
        code,
      }
    )

    yield put(setFormData(response.data))
  } catch (exception) {
    yield put(setFormData(INITIAL_STATE.formData))
  }
}

export default all([takeLatest(TYPES.LINKEDIN_DATA_REQUEST as any, linkedinDataRequest)])
