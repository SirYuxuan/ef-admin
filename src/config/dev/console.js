module.exports = {
  webpackBarName: 'Ef Admin',
  webpackBanner: ' build: Ef Admin time: ',
  adConsole() {
    const chalk = require('chalk')
    console.log(chalk.green('> 欢迎使用Ef Admin'))

    console.log(chalk.green('> 如果您不希望显示以上信息，可在config中配置关闭'))
    console.log('\n')
  },
}
