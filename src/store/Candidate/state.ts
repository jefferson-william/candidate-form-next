import State from '~/types/store/Candidate/state.d'

export const INITIAL_STATE: State = {
  formData: {
    name: '',
    email: '',
    whereDidYouWork: [],
    knowledge: [],
  },
}

export default INITIAL_STATE
