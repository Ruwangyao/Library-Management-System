// ElementPlus自动导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    port: 8000,
    // 添加以下配置解决CORS问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 允许所有来源的请求
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      // ElementPlus的自动导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
