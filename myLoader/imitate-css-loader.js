/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function selfLoader(content, map, meta) {
  // 你的 webpack loader 代码
  return `/**__CSS_SOURCE__${content}*/`;
}

module.exports = selfLoader;
