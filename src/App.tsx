/*
 * @Author: bill Lin_k_Bill@163.com
 * @Date: 2022-12-12 19:40:10
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2022-12-12 22:44:34
 * @FilePath: /babel-demo/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  useEffect(() => {
    console.log(123)
  })
  const tracker = () => {
    console.log(234)
  }
  return <div className="App">app</div>
}

export default App
