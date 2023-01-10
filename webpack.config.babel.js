import merge from 'webpack-merge';

import baseConfig from './webpack/configurationBase';
import devConfig from './webpack/configurationDevelop';
import prodConfig from './webpack/configurationProduction';
import { isProd } from './webpack/utils/env';

export default () => (isProd ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig));
