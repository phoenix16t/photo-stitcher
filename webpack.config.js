const webpack = require('webpack');
const path = require('path');

const config = (env, argv) => ({
  entry: {
    main: path.resolve(__dirname, './src/client') + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/build'),
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      }, {
        test: /(\.css|.scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  watch: true
});

module.exports = config;
