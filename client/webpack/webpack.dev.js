const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  // watch: true,
  watchOptions: {
    poll: 100,
    ignored: /node_modules/,
  },
 
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('TVS'),
      // 'process.env.API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL)
    }),
  ],
}
