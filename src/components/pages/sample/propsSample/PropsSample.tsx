import React, { memo } from 'react'

export const PropsSample: React.FC = memo(() => {
  return (
    <>
      <h3>Propsサンプル</h3>
      <div>
        Childrenコンポーネントにpropsとしてデータ(Hello)を渡す
        <Children message="Hello" />
      </div>
    </>
  )
})

// 教育説明用のため同じファイル内に子コンポーネントを置いてます。

// 子コンポーネントのPropsの型定義
type Props = {
  message: string
}

// 子コンポーネント
const Children: React.FC<Props> = memo((props: Props) => {
  // propsからデータを受け取る(分割代入とオブジェクトの省略記法を利用)
  const { message }: { message: string } = props

  return (
    <>
      <h3>Childrenコンポーネント</h3>
      <div>Childrenコンポーネントにデータが渡りました {message}</div>
    </>
  )
})
