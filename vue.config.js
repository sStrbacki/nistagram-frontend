module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData : `@import "~@/variables.sass"`
      }
    }
  }
}
