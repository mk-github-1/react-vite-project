import React, { useState, memo, useCallback } from 'react'

export const UseCallbackSample: React.FC = memo(() => {
  const [count, setCount] = useState<number>(0)

  const onClickReset1 = () => {
    setCount(0)
  }

  const onClickReset2 = useCallback(() => {
    setCount(0)
  }, [])

  return (
    <>
      <h3>UseCallbackサンプル</h3>
      <div>
        <p>parentコンポーネントのcountボタン</p>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>

        <p>countボタンを実行してから、リセットボタンを実行してください</p>
        <p>
          レンダリングはconsoleを確認する
          <br />
          Childrenコンポーネント1は常にレンダリングされる
          <br />
          Childrenコンポーネント2はレンダリングされない
        </p>
        <Children1 onClickReset={onClickReset1} />
        <Children2 onClickReset={onClickReset2} />
      </div>
    </>
  )
})

// 教育説明用のため同じファイル内に子コンポーネントを置いてます。

// ChildrenコンポーネントのPropsの型定義
type PropTest = {
  onClickReset(): void
}

// Childrenコンポーネント
const Children1: React.FC<PropTest> = memo((props: PropTest) => {
  console.log('Childrenコンポーネント1の再レンダリング')

  // propsからデータを受け取る(分割代入とオブジェクトの省略記法を利用)
  const { onClickReset } = props

  return (
    <>
      <h3>Childrenコンポーネント1</h3>
      <div>
        <p>リセットボタン(useCallbackなし)</p>
        <button onClick={onClickReset}>リセット</button>
      </div>
    </>
  )
})

// Childrenコンポーネント
const Children2: React.FC<PropTest> = memo((props: PropTest) => {
  console.log('Childrenコンポーネント2の再レンダリング')

  // propsからデータを受け取る(分割代入とオブジェクトの省略記法を利用)
  const { onClickReset } = props

  return (
    <>
      <h3>childrenコンポーネント2</h3>
      <div>
        <p>リセットボタン(useCallbackあり)</p>
        <button onClick={onClickReset}>リセット</button>
      </div>
    </>
  )
})
