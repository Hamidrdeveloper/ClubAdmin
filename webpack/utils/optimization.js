import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  minimizer: [new UglifyJsPlugin({ uglifyOptions: { compress: false } })],
  runtimeChunk: {
    name: 'runtime',
  },
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial',
      },
    },
  },
};
