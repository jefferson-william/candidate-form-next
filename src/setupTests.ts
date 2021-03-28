// @ts-nocheck
import 'jest-styled-components' // https://github.com/styled-components/jest-styled-components#snapshot-testing
import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'
import dotenv from 'dotenv'
import path from 'path'

const dotenvPath = path.join(__dirname, '..', '.env.local')

dotenv.config({ path: dotenvPath })

global.MutationObserver = global.window.MutationObserver

// eslint-disable-next-line no-console
const originalError = console.error

// eslint-disable-next-line no-console
console.error = (...args) => {
  const controlledComponentsWarning =
    'Warning: A component is changing an uncontrolled input to be controlled.' +
    '.*' +
    'https://reactjs.org/link/controlled-components'

  const regex = new RegExp(controlledComponentsWarning)

  if (regex.test(args[0])) {
    return
  }

  originalError.call(console, ...args)
}
