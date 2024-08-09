import React, { memo } from 'react'

export const MemoSample: React.FC = memo(() => {
  const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState<number>(0)

  console.log('Appはレンダリングされる')

  return (
    <>
      <h3>memoサンプル</h3>
      <div>
        <p>再レンダリングの状態はコンソールで確認してください</p>
        <button onClick={() => setCount(count + 1)}> count is {count}</button>
      </div>
      <br />
      <Children />
    </>
  )
})

// 教育説明用のため同じファイル内に子コンポーネントを置いてます。
const Children: React.FC = memo(() => {
  console.log('ここは実行されていないことを確認できる')

  return <>Childrenコンポーネント</>
})
