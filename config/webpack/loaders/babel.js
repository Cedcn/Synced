module.exports = {
  test: /\.js(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', { modules: false }]
    ],
    plugins: [
      ['transform-object-rest-spread', { useBuiltIns: true }]
    ]
  }
}
