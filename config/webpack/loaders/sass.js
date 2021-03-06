const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  rules: [{
    test: /\.(scss|sass|css)$/i,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { config: '.postcssrc.yml' }
        }, {
          loader: 'sass-loader?sourceMap'
        }
      ]
    }),
    exclude: [/flexboxgrid/, /react-toolbox/]
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?sourceMap&modules&localIdentName=[name]-[local]--[hash:base64:8]',
        {
          loader: 'postcss-loader',
          options: { config: '.postcssrc.yml' }
        }
      ]
    }),
    include: [/flexboxgrid/, /react-toolbox/]
  }]
};
