import React, { useState, memo } from 'react'

export const UseMemoNothingSample: React.FC = memo(() => {
  const [count1, setCount1] = useState<number>(0)
  const [count2, setCount2] = useState<number>(0)

  // 変数(関数の結果)
  const square = (): number => {
    let i = 0
    while (i < 300000000) i++
    return count1 * count1
  }

  return (
    <>
      <h3>UseMemo無しサンプル</h3>
      <div>
        count1に関係するsquareにuseMemoが無いため、どのボタンでも処理が重い
        <br />
        <br />
        <button onClick={() => setCount1(count1 + 1)}>count1 is {count1}</button>
        <br />
        <button onClick={() => setCount2(count2 + 1)}>count2 is {count2}</button>
      </div>
      <div>
        <p>square: {square()}</p>
      </div>
    </>
  )
})
