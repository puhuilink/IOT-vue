class Log {
  static start(message) {
    console.log('\x1b[36m%s\x1b[0m', `${message}开始`)
  }

  static success(message) {
    console.log('\x1b[32m%s\x1b[0m', `${message}完成`)
  }

  static failure(message) {
    console.log('\x1b[31m%s\x1b[0m', `${message}失败`)
  }

  static info(message) {
    console.log('\x1b[35m%s\x1b[0m', `${message}`)
  }

  static warn(message) {
    console.log('\x1b[33m%s\x1b[0m', `${message}`)
  }
}

function now() {
  const d = new Date()
  const Y = d.getFullYear()
  const M = d.getMonth() + 1
  const D = d.getDate()
  const H = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()
  const pad = num => num.toString().padStart(2, '0')
  return `${Y}-${pad(M)}-${pad(D)}-${pad(H)}:${pad(m)}:${pad(s)}`
}

module.exports = {
  Log,
  now
}
