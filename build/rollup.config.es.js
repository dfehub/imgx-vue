import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'imgx-vue',
    file: 'dist/imgx-vue.esm.js',
    format: 'es',
  },
})

export default config
