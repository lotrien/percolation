const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader']
        },

        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve(__dirname, 'dist')
              }
            },
            "css-loader"
          ]
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
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css"
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
