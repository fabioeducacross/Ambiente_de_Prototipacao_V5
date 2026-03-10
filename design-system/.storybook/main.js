const path = require('path')

const dsNodeModules = path.resolve(__dirname, '../node_modules')

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  previewHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Montserrat:wght@300;400;500;600;700&display=swap" />
  `,
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const { default: vue } = await import('@vitejs/plugin-vue')
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../FrontOffice/src'),
          'vue': path.resolve(dsNodeModules, 'vue/dist/vue.esm-bundler.js'),
          'bootstrap-vue-next': path.resolve(dsNodeModules, 'bootstrap-vue-next'),
          'bootstrap': path.resolve(dsNodeModules, 'bootstrap'),
          'bootstrap-icons': path.resolve(dsNodeModules, 'bootstrap-icons'),
          '@popperjs/core': path.resolve(dsNodeModules, '@popperjs/core'),
          'vue-flatpickr-component': path.resolve(dsNodeModules, 'vue-flatpickr-component'),
          'flatpickr': path.resolve(dsNodeModules, 'flatpickr'),
          '@vuepic/vue-datepicker': path.resolve(dsNodeModules, '@vuepic/vue-datepicker')
        }
      }
    })
  }
}

module.exports = config
