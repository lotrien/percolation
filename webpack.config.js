const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = () => {
  const config = {
    mode: 'development',
    devServer: {
      historyApiFallback: true,
    },

    entry: {
      app: path.resolve(__dirname, 'src', 'index.jsx'),
    },

    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader']
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
      })
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins = [
      new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify('production') }),
      new webpack.optimize.UglifyJsPlugin()
    ];
  }

  return config;
}
