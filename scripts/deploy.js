/*
 * @Description:自动部署脚本.
 * @Version: 1.0
 * @Author: Zhangjunjie
 * @Date: 2022-1-25
 */
// 根据鑫哥之前写的部署脚本改良并适配到工业企业网络安全综合防护平台
// # 打版本，以 1.0.0 为例
// git checkout master
// # 修改 package.json 中 version 为 1.0.0
// git stage .
// git commit -m 'release 1.0.0'
// git tag '1.0.0' -a # 填写具体内容 xxx
// git push
// git puh --tags

// # 部署至测试环境
// npm run deploy:testing

// # 部署至开发环境
// npm run deploy:development

const { NodeSSH } = require('node-ssh')
const path = require('path')
const { zip, COMPRESSION_LEVEL } = require('zip-a-folder')
const { Log, now } = require('./utils')

const [target] = process.argv.slice(2)
const IS_TESTING = target === '--testing'

const HOST = IS_TESTING ? '116.63.139.209' : '192.168.2.94'
const USERNAME = 'root'
const PASSWORD = IS_TESTING ? 'Puhuilink@123' : 'puhuilink00'
const DOCKER_NGINX_CONTAINER = IS_TESTING ? 'wumei-nginx' : 'wumei_nginx'
const DOCKER_NGINX_ROOT = '/etc/nginx'

const ssh = new NodeSSH()

const { execCommand } = ssh

// for better log
ssh.execCommand = function() {
  return execCommand
    .apply(this, Array.from(arguments))
    .then(({ stdout, stderr }) => stderr ? Promise.reject(stderr) : Promise.resolve(stdout))
}

Log.start(`服务器部署至${HOST}`)
ssh
  .connect({
    host: HOST,
    username: USERNAME,
    password: PASSWORD
  })
  .then(async() => {
    Log.start('打包')
    const distDir = path.join(__dirname, '../dist')
    const distZip = path.join(__dirname, '../dist.zip')
    await zip(distDir, distZip, COMPRESSION_LEVEL.medium)
    Log.success('打包')

    const clean = () => ssh.execCommand('rm -rf dist dist.zip', { cwd: '/tmp' })
    await clean()

    Log.start('上传压缩包')
    await ssh.putFiles([{
      local: distZip,
      remote: '/tmp/dist.zip'
    }])
    Log.success('上传压缩包')

    Log.start('解压缩')
    await ssh.execCommand('unzip -o dist.zip -d dist', { cwd: '/tmp' })
    Log.success('解压缩')

    Log.start('备份上一版本')
    const backup = `dist.${now()}.back`
    await ssh
      .execCommand(`docker exec -i ${DOCKER_NGINX_CONTAINER} mv -vn ${DOCKER_NGINX_ROOT}/dist ${DOCKER_NGINX_ROOT}/${backup}`)
      .then(() => Log.success(`备份上一版本 ${backup} `))
      .catch((err) => err.includes('No such file or directory') ? Log.info('暂无上一版本') : Promise.reject(err))

    Log.start('部署最新版本')
    await ssh.execCommand(`docker cp /tmp/dist ${DOCKER_NGINX_CONTAINER}:${DOCKER_NGINX_ROOT}/dist`)
    Log.success('部署最新版本')

    await clean()
  })
  .then(() => {
    Log.success(`服务器部署至${HOST}`)
    process.exit(0)
  })
  .catch((err) => {
    Log.failure(`服务器部署至${HOST}`)
    console.error(err)
    process.exit(1)
  })
