/*
 * @Author: bill Lin_k_Bill@163.com
 * @Date: 2022-12-12 19:44:59
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2022-12-12 20:23:03
 * @FilePath: /babel-demo/insert-plugin/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {
  declare
} = require('@babel/helper-plugin-utils');

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

const parametersInsertPlugin = ({
  types,
  template
}, options, dirname) => {
  return {
    visitor: {
      CallExpression(path, state) {
        console.log('running plugin...')
        if (path.node.isNew) {
          return;
        }
        const calleeName = path.get('callee').toString();
        if (targetCalleeName.includes(calleeName)) {
          const {
            line,
            column
          } = path.node.loc.start;
          const newNode = template.expression(`console.log("${state.filename || 'unkown filename'}: (${line}, ${column})")`)();
          newNode.isNew = true;

          if (path.findParent(path => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]))
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      }
    }
  }
}
module.exports = parametersInsertPlugin;
