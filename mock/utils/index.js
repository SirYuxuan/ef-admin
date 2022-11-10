const { Random } = require('mockjs')
const { join } = require('path')
const fs = require('fs')
/**
 * 随机生成图片url。
 * @param width 宽度
 * @param height 高度
 * @returns {string} URL
 */
function handleRandomImage(width = 50, height = 50) {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

/**
 * 处理所有 api 模块
 * @returns {[]}
 */
function handleMockArray() {
  const mockArray = []
  const getFiles = (jsonPath) => {
    const jsonFiles = []
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path)
      files.forEach((item) => {
        const fPath = join(path, item)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findJsonFile(item)
        if (stat.isFile() === true) jsonFiles.push(item)
      })
    }
    findJsonFile(jsonPath)
    jsonFiles.forEach((item) => mockArray.push(`./api/${item}`))
  }
  getFiles('mock/api')
  return mockArray
}
module.exports = {
  handleRandomImage,
  handleMockArray,
}