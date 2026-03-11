import { setup } from '@storybook/vue3'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'flatpickr/dist/flatpickr.min.css'
import '../tokens/tokens.css'

setup((app) => {
  app.use(createBootstrap())
})

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FAFAFA' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#2D2D3A' }
      ]
    }
  }
}

export default preview
