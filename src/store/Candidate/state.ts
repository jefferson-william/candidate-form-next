import State from '~/types/store/Candidate/state.d'

export const INITIAL_STATE: State = {
  formData: {
    fullName: '',
    email: '',
    picture: '',
    knowledge: [],
    knowledgeList: [0],
    whereDidYouWork: [],
    whereDidYouWorkList: [0],
    panelIndex: 0,
  },
  obtainedUserDataFromLinkedin: false,
}

export default INITIAL_STATE
