import React, { useState, memo, useMemo } from 'react'

export const UseMemoSample: React.FC = memo(() => {
  const [count1, setCount1] = useState<number>(0)
  const [count2, setCount2] = useState<number>(0)
  console.log('再レンダリング')

  // 変数(関数の結果)
  const square = useMemo((): number => {
    let i = 0
    while (i < 300000000) i++
    return count2 * count2
  }, [count2])

  return (
    <>
      <h3>UseMemoサンプル</h3>
      <div>
        count1に関係するsquareにuseMemoがあるため、count1のボタンは影響を受けないため軽い
        <br />
        <br />
        <button onClick={() => setCount1(count1 + 1)}>count1 is {count1}</button>
        <br />
        <button onClick={() => setCount2(count2 + 1)}>count2 is {count2}</button>
      </div>
      <div>
        <p>square: {square}</p>
      </div>
    </>
  )
})
