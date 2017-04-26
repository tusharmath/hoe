/**
 * Created by tushar on 26/04/17.
 */

'use strict'


import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babili";

export default {
  exports: 'named',
  entry: './hoe.js',
  dest: './dist/hoe.js',
  format: 'umd',
  moduleName: 'hoe',
  plugins: [
    minify({comments: false}),
    commonjs({}),
  ]
}
