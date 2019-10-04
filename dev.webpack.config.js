const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
