import { defineConfig } from 'cypress'
import codeCoverageTask from '@cypress/code-coverage/task'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      on('file:preprocessor', vitePreprocessor())
      return config
    },
  },
  video: false,
  fixturesFolder: false,
  screenshotOnRunFailure: false,
})
