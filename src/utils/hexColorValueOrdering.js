/*
 * @Author: KXB
 * @Date: 2022-03-15 16:43:14
 * @FilePath: \IOT-vue\src\utils\hexColorValueOrdering.js
 */
const hexToRgbMap = new Map()
const grayToHex = new Map()

function hexToRgb(hex) {
  var HASH$1 = '#'
  var EMPTY_STRING$1 = ''
  hex = hex.toString().replace(HASH$1, EMPTY_STRING$1)
  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
function getMid(str) {
  var left = str.indexOf('(') + 1
  var right = str.indexOf(')')
  return str.slice(left, right)
}
function grayLevel(color) {
  var rgbColor = hexArrayToRgb(color)
  var grayscaleValueArray = []
  rgbColor.forEach(item => {
    var arr = []
    arr = getMid(item).toString().split(',')
    var r = arr[0] * 0.299
    var g = arr[1] * 0.587
    var b = arr[2] * 0.114
    var grayscaleValue = r + g + b
    var hexValue = hexToRgbMap.get(item)
    grayToHex.set(grayscaleValue, hexValue)
    grayscaleValueArray.push(grayscaleValue)
  })
  return grayscaleValueArray
}
function hexArrayToRgb(hexArray) {
  var localhexArray = []
  hexArray.forEach(item => {
    var b = hexToRgb(item)
    localhexArray.push(b)
    hexToRgbMap.set(b, item)
  })
  return localhexArray
}
// 根据灰度值大小对颜色进行排序
export function quickSort(color) {
  var grayscaleValueArray = grayLevel(color)
  grayscaleValueArray.sort(function(a, b) { return a - b })
  const resultArray = []
  grayscaleValueArray.forEach(item => {
    var hexResult = grayToHex.get(item)
    resultArray.push(hexResult)
  })
  return resultArray
}
