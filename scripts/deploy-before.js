const cp = require('child_process')
const os = require('os')
const { Log } = require('./utils')

const { version } = require('../package.json')
const branch = cp.execSync('git branch --show-current').toString().replace(os.EOL, '')
const CONFIRM_WORD = 'confirm'

require('readline')
  .createInterface({
    input: process.stdin,
    output: process.stdout
  })
  .on('SIGINT', cancel)
  .question(
    `当前分支：${branch}` + os.EOL +
    `当前版本：${version}` + os.EOL +
    `确认部署请输入${CONFIRM_WORD}并回车，其他操作将取消部署` + os.EOL,
    answer => answer === CONFIRM_WORD ? confirm() : cancel()
  )

function confirm() {
  Log.info('确认部署')
  process.exit(0)
}

function cancel() {
  Log.warn('取消部署')
  process.exit(1)
}
