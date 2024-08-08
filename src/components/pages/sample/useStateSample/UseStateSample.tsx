import React, { useState, memo } from 'react'

export const UseStateSample: React.FC = memo(() => {
  // 左辺：1つ目にState変数を指定、2つめにStateを更新するための関数を指定
  // 右辺：useState<>の<>にはデータ型を指定します、0は初期値です
  // 右辺を左辺に配列の分割代入をしています。
  const [count, setCount] = useState<number>(0)
  console.log('再レンダリング')
  const count2: number = 1

  // 標準のuseStateのサンプルがわかりにくかったため、関数に分離しています。
  // 引数を渡さなくてもState変数のcountの値を更新しています。
  const incrementCount = () => {
    setCount((count: number) => count + 1)
  }

  return (
    <>
      <h3>UseStateサンプル</h3>
      <div>
        count2: {count2 + 1}
        <p>ボタンをクリックすると数値が増えます</p>
        <p>コンポーネントは都度、再レンダリングされています</p>
        <button onClick={incrementCount}>count is {count}</button>
      </div>
    </>
  )
})
