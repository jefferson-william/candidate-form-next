import State from '~/module/Candidate/store/state.d'

export const INITIAL_STATE: State = {
  formData: {
    fullName: '',
    email: '',
    picture: '',
    knowledge: [''],
    whereDidYouWork: [''],
    panelIndex: 0,
  },
  obtainedUserDataFromLinkedin: false,
}

export default INITIAL_STATE
