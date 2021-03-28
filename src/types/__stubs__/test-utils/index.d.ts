import States from '~/types/store/rootStates'
import { Theme } from '@material-ui/core'
import { Router } from 'next/router'

export interface MyRenderOptions {
  router?: Partial<Router>
  theme?: Theme
  initialState?: States
  store?(states?: States): Store<any, any>
}

export interface MyRenderedOptions {
  router?: Partial<Router>
  theme?: Theme
  initialState?: States
  store: Store<any, any>
}
