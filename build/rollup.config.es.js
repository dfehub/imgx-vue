import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue-imgx',
    file: 'dist/vue-imgx.esm.js',
    format: 'es',
  },
})

export default config
