const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'lodash': 'lodash-es',
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      // Add other polyfills if needed
    },
  },

  module: {
    
    rules: [
           {
        test: /pdf\.worker\.min\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|webp|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename:'[name][contenthash].js',
    clean: true,
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    })
  ],
  // stats: 'errors-only',
}
