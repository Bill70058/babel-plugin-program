/*
 * @Author: bill Lin_k_Bill@163.com
 * @Date: 2022-12-12 19:43:05
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2022-12-12 20:14:07
 * @FilePath: /babel-demo/.babelrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
