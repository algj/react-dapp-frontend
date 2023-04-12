const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  // Remove the existing instance of HtmlWebpackPlugin from config.plugins
  config.plugins = config.plugins.filter(
    plugin => !(plugin instanceof HtmlWebpackPlugin)
  );

  // Add HtmlWebpackPlugin with your desired configuration
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
      ...require('./src/Config.js')
    })
  );

  return config;
}
