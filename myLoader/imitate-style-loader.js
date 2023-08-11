/**
 *
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function selfLoader(content, map, meta) {
  const cssContent = content.match(/(?<=__CSS_SOURCE__)((.|\s)*?)(?=\*\/)/g);
  console.log('---cssContent-->',cssContent)
  let style = `const styleDom = document.createElement('style');
  styleDom.innerHTML=${JSON.stringify(cssContent)};
  document.head.appendChild(styleDom);
  `;
  return style
  
}

module.exports = selfLoader;
