import { Queries, RenderResult } from '@testing-library/react'
import { Theme } from '@material-ui/core'
import { Router } from 'next/router'
import States from '~/types/store/rootStates'
import customQueries, { MyQueries } from '~/shared/utils/test-utils/custom-queries'

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
