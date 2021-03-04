import resolve from 'rollup-plugin-node-resolve' 
import commonjs from '@rollup/plugin-commonjs' 
import vue from 'rollup-plugin-vue' 
import babel from '@rollup/plugin-babel'  
import css from 'rollup-plugin-css-only'
import CleanCSS from 'clean-css' 
import { writeFileSync } from 'fs'
import { terser } from "rollup-plugin-terser"; 

export default {
  input: 'src/index.js',
  plugins: [
    resolve({ extensions: ['.vue'] }),
    vue({ css: false ,compileTemplate: true }),
    css({ output(style) {
      // 压缩 css 写入 dist/vue-imgx.css
      writeFileSync('dist/vue-imgx.css', new CleanCSS().minify(style).styles)
    } }),
    // css: false 将<style>块转换为导入语句，rollup-plugin-css-only可以提取.vue文件中的样式
    babel(),
    commonjs(),
    terser({ compress: { drop_console: true } })
  ]
}
