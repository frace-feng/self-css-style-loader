/**
 * 开发一个文件清单插件:
 * 每次webpack打包后，自动产生一个打包文件清单，上面要记录文件名、文件数量等信息。
 */
/**
 * 思路：
显然这个操作需要在文件生成到dist目录之前进行，所以我们要注册的是Compiler上的emit钩子。
emit 是一个异步串行钩子，我们用 tapAsync 来注册。
在 emit 的回调函数里我们可以拿到 compilation 对象，所有待生成的文件都在它的 assets 属性上。
通过 compilation.assets 获取我们需要的文件信息，并将其整理为新的文件内容准备输出。
然后往 compilation.assets 添加这个新的文件。
 */

class FileListPlugin {
  constructor(options) {
    // 获取插件配置项
    this.filename =
      options && options.filename ? options.filename : "FILELIST.md";
  }

  apply(compiler) {
    // 注册 compiler 上的 emit 钩子
    compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, cb) => {
      // 通过 compilation.assets 获取文件数量
      const assets =compilation.assets;
      let len = Object.keys(assets).length;

      // 添加统计信息
      let content = `# ${len} file${len > 1 ? "s" : ""} emitted by webpack\n\n`;

      // 通过 compilation.assets 获取文件名列表
      Object.keys(assets).forEach(file=>{
        content += `- ${file} - ${assets[file].size()} bytes\n`;
      })

      // 往 compilation.assets 中添加清单文件
      compilation.assets[this.filename] = {
        // 写入新文件的内容
        source: function () {
          return content;
        },
        // 新文件大小（给 webapck 输出展示用）
        size: function () {
          return content.length;
        },
      };

      // 执行回调，让 webpack 继续执行
      cb();
    });
  }
}

module.exports = FileListPlugin;
