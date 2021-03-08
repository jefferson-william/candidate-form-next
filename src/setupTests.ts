// @ts-nocheck
import 'jest-styled-components' // https://github.com/styled-components/jest-styled-components#snapshot-testing
import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'
import dotenv from 'dotenv'
import path from 'path'

const dotenvPath = path.join(__dirname, '..', '.env.local')

dotenv.config({ path: dotenvPath })

global.MutationObserver = global.window.MutationObserver
