module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8001,
    host: '0.0.0.0',
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
