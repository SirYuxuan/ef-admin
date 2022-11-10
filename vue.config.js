const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const { adConsoleLog, devPort } = require('./src/config/index')
const { adConsole, webpackBarName } = require('./src/config/dev/console')
const webpackBar = require('webpackbar')
const { mockServer } = require('./mock')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: devPort,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      mockServer(devServer.app)
      return middlewares
    }
  },
  configureWebpack: {
    plugins: [
      new webpackBar({
        name: webpackBarName,
      }),
    ],
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
      },
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
  },
  chainWebpack(config){
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets'))
      .end()
    config.module
      .rule('efIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/assets'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'ef-icon-[name]' })
      .end()
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (relativePath.replace(/\\/g, '/') !== 'src/assets/style/variables.module.scss') {
            return '@import "~@/assets/style/variables.module.scss";' + content
          }
          return content
        },
      }
    }
  }

})

if (adConsoleLog) {
  adConsole()
}