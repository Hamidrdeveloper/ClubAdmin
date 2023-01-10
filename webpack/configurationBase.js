import path from 'path';

import { aliasItems, externalItems } from './config';
import * as plugins from './plugins';
import * as rules from './rules';
import entry from './utils/entry';
import { isDevServer, isProd } from './utils/env';
import { arrayFilterEmpty } from './utils/helpers';
import optimization from './utils/optimization';

export default {
  context: __dirname,
  target: isDevServer ? 'web' : ['web', 'es5'],
  mode: isProd ? 'production' : 'development',
  entry,
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: isDevServer ? '[name].[fullhash].js' : '[name].[contenthash].js',
  },
  module: {
    rules: arrayFilterEmpty([
      rules.javascriptRule,
      rules.typescriptRule,
      rules.htmlRule,
      rules.imagesRule,
      rules.fontsRule,
      rules.cssRule,
      ...rules.lessRules,
      ...rules.sassRules,
      ...rules.svgRules,
    ]),
  },
  plugins: arrayFilterEmpty([
    plugins.copyPlugin,
    plugins.definePlugin,
    plugins.esLintPlugin,
    plugins.htmlWebpackPlugin,
    plugins.forkTsCheckerWebpackPlugin,
    plugins.providePlugin,
  ]),
  resolve: {
    alias: aliasItems,
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimization,
  externals: externalItems,
};
