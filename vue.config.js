module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
  },
  devServer: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': "nosniff"
    }
  },
}
