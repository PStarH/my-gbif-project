module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.gbif.org',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
