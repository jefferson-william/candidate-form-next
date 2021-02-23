import axios from 'axios'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import { setFormData } from '~/store/Candidate/actions'
import INITIAL_STATE from '~/store/Candidate/state'
import TYPES from '~/store/Candidate/types'

export function* linkedinDataRequest(code: string) {
  try {
    const response = yield call(axios.post, `${process.env.NEXT_PUBLIC_URL}/api/linkedin/callback`, {
      code,
    })

    yield put(setFormData({ formData: response.data }))
  } catch (exception) {
    yield put(setFormData({ formData: INITIAL_STATE.formData }))
  }
}

export default all([takeLatest(TYPES.LINKEDIN_DATA_REQUEST as any, linkedinDataRequest)])
