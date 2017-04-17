const webpackMerge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = function() {
  return webpackMerge(webpackConfigBase(), {
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    output: {
      publicPath: './'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      require('postcss-import'),
                      require('postcss-cssnext'),
                      require('postcss-remove-root'),
                      require('css-mqpacker')({
                        sort: true
                      }),
                      require('cssnano')({
                        autoprefixer: false,
                        safe: true
                      })
                    ];
                  }
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].bundle.css'),
      new CleanWebpackPlugin(['assets'])
    ]
  })
};
