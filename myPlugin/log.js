/**
 * 它注册了 Compiler 上的异步串行钩子 done，在钩子中注入了一条控制台打印的语句。
 */

class MyPlugin{
  apply(compiler){
    compiler.hooks.done.tap('My Plugin', (stats) => {
      console.log('Bravo!');
    });
  }
}
module.exports = MyPlugin;