const {
  declare
} = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');

const autoTrackPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);

  return {
    visitor: {
      // 判断是否有被引入过
      Program: {
        enter(path, state) {
          // 通过traverse遍历ImportDeclaration
          path.traverse({
            ImportDeclaration(curPath) {
              const requirePath = curPath.get('source').node.value;
              // 如果引入了模块，将ID记录到state
              if (requirePath === options.trackerPath) {
                const specifierPath = curPath.get('specifiers.0');
                // 不同的引入方式取ID的方式不同
                if (specifierPath.isImportSpecifier()) {
                  state.trackerImportId = specifierPath.toString();
                } else if (specifierPath.isImportNamespaceSpecifier()) {
                  state.trackerImportId = specifierPath.get('local').toString();
                }
                path.stop();
              }
            }
          });
          if (!state.trackerImportId) {
            // 将引入模块放在helper作为公共函数，将tracker模块名作为参数传入，通过options.trackerPath来取
            state.trackerImportId = importModule.addDefault(path, 'tracker', {
              nameHint: path.scope.generateUid('tracker')
            }).name;
            // 记录tracker模块id的时候，也生成tracker模块的ast
            state.trackerAST = api.template.statement(`${state.trackerImportId}()`)();
          }
        }
      },
      // 函数插桩
      'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
        const bodyPath = path.get('body');
        // 有函数体就插入埋点
        if (bodyPath.isBlockStatement()) {
          bodyPath.node.body.unshift(state.trackerAST);
        } else {
          const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({
            PREV_BODY: bodyPath.node
          });
          bodyPath.replaceWith(ast);
        }
      }
    }
  }
});
module.exports = autoTrackPlugin;
