

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin =require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const nodeExternals = require("webpack-node-externals");
// const CompressionPlugin = require("compression-webpack-plugin");

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  
  watchOptions: {
    poll: 100,
    ignored: /node_modules/,
  },
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
  
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },},
  // Where files should be sent once they are bundled
  output: {
    path: path.resolve(__dirname, "dist"),
    filename:'[contenthash].js',
    clean: true,
    // assetModuleFilename:'./assets/[name][ext]',
  },
  // devtool:'eval',
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    static : {
      directory: path.resolve(__dirname,'dist')
    },
    port: 4000,
    open:true,
    compress:true,
    historyApiFallback:true,
    hot: true,

  },
  // Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
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
 
  resolve: {
        // ... other resolve configurations
        alias: {
          'lodash': 'lodash-es',
        },
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          // Add other polyfills if needed
        },
      },
      
      optimization: {
        chunkIds:'deterministic',
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          // removeAvailableModules: true,
          // removeEmptyChunks: false,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              // test: /[\\/]src[\\/]/,
              name:"main",
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
  plugins: [
    
    //   new CompressionPlugin({
    //   filename: '[path][base].gz',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new CompressionPlugin({
    //   filename: '[path][base].br',
    //   algorithm: 'brotliCompress',
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: {
    //     level: 11,
    //   },
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    new HtmlWebpackPlugin({ template:  path.resolve(__dirname, '..', './src/index.html') }),
        // new BundleAnalyzerPlugin(),
        
      ],
};
