// 导出module下的所有配置文件
const routine = require('./module/routine.config')
const theme = require('./module/theme.config')
const net = require('./module/net.config')
module.exports = Object.assign({}, routine, theme, net)