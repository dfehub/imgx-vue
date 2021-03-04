import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-imgx',
    file: 'dist/vue-imgx.umd.js',
    format: 'umd'
  },
})

export default config
