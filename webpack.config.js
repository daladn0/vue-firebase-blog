const webpack = require('webpack')
const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require("path");

module.exports = {
  mode:"development",
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true, // Fixed ' cannot GET/ ' problem
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          esModule: false,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/svg'),
        use: [
          {
            loader: 'svg-sprite-loader', 
            options: {
              extract: true,
              outputPath: '/'
            }
          },
          'svgo-loader'
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // If you are using the options api.
        __VUE_PROD_DEVTOOLS__: false, // If you don't want people sneaking around your components in production.
    }),
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ],
  resolve: {  

    alias: {  
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views')
    },  
  },  
};