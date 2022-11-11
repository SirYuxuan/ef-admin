/**
 * 系统常规设置
 * @author Sir丶雨轩
 * @since 2020-11-19
 */
const routine = {
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 是否显示版权信息
  footerCopyright: true,
  // 版权名称
  copyright: 'Sir丶雨轩',
  // 是否展示广告
  showAd: true,
  // 登录页路径
  loginPath: '/login',
  // 可以不需要权限访问的白名单列表
  routesWhiteList: ['/404', '/401', '/500'],
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  // 网站标题
  title: 'Ef Admin',
  //vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOopeneds: [],
  // token key
  tokenName: 'ef-admin-token',
  // logo地址或icon
  logo: 'https://images.evetech.net/corporations/98598862/logo?size=32',
  // 是否开启控制台广告
  adConsoleLog: true,
}

// 把登录页地址追加到白名单中
routine.routesWhiteList.push(routine.loginPath)
module.exports = routine