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
        }
      ]
    }),
    exclude: [/flexboxgrid/, /react-toolbox/, /app\/javascript/]
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?sourceMap&modules&localIdentName=[path][name]-[local]--[hash:base64:8]',
        {
          loader: 'postcss-loader',
          options: { config: '.postcssrc.yml' }
        }
      ]
    }),
    include: [/flexboxgrid/, /react-toolbox/, /app\/javascript/]
  }]
};
