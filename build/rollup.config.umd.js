import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'imgx-vue',
    file: 'dist/imgx-vue.umd.js',
    format: 'umd'
  },
})

export default config
