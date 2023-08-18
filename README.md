# 自定义一个loader

仿照css-loader写一个loader

loader 本质上是导出为函数的 JavaScript 模块。loader runner 会调用此函数，然后将上一个 loader 产生的结果或者资源文件传入进去。函数中的 this 作为上下文会被 webpack 填充，并且 loader runner 中包含一些实用的方法，比如可以使 loader 调用方式变为异步，或者获取 query 参数。

起始 loader 只有一个入参：资源文件的内容。compiler 预期得到最后一个 loader 产生的处理结果。这个处理结果应该为 String 或者 Buffer（能够被转换为 string）类型，代表了模块的 JavaScript 源码。另外，还可以传递一个可选的 SourceMap 结果（格式为 JSON 对象）。

如果是单个处理结果，可以在 同步模式 中直接返回。如果有多个处理结果，则必须调用 this.callback()。在 异步模式 中，必须调用 this.async() 来告知 loader runner 等待异步结果，它会返回 this.callback() 回调函数。随后 loader 必须返回 undefined 并且调用该回调函数。

## css-loader

主要目的是为了解析通过 import/require 引入的 css 样式文件

## style-loader

style-loader 负责把 css样式 放进dom中，实现相对比 css-loader 容易些

## 需要的依赖

webpack webpack-cli html-webpack-plugin webpack-dev-server --D

webpack webpack-cli：搭建webpack项目
html-webpack-plugin：帮忙生成html文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。

## 简单plugin

- compiler.hooks.done.tap 在打包构建完成后打印日志
- compiler.hooks.emit.tapAsync 一个文件清单和大小的插件，需要在文件生成到dist目录之前进行

## webpack构建速度分析工具

speed-measure-webpack-plugin
